const yaml = require("js-yaml");
const fs = require("fs");
const nunjucks = require("nunjucks");

const delayFactory = require("./delayCalls");

const API = "https://api.meetup.com";
const key = process.env.MEETUP_KEY;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
const groups = yaml
  .safeLoad(fs.readFileSync("groups.yml", "utf8"))
  .sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });

buildPages();

async function buildPages() {
  try {
    // Load upcoming events.
    let upcomingEvents = await loadMeetupEvents();
    upcomingEvents = [...loadEvents(), ...upcomingEvents];

    upcomingEvents = upcomingEvents.sort((a, b) => {
      const timeA = a.time;
      const timeB = b.time;
      if (timeA < timeB) {
        return -1;
      }
      if (timeA > timeB) {
        return 1;
      }

      return 0;
    });
    let pages = fs.readdirSync(`pages/`);
    pages = pages.filter(page => page.includes(".njk"));

    pageNames = pages.map(page => page.split(".")[0]);

    const pageTitles = {
      index: "Awesome Athens",
      about: "About",
      contact: "Contact",
      events: "Upcoming events"
    };

    if (!fs.existsSync("public")) {
      fs.mkdirSync("public");
    }

    pages.forEach(page => {
      const currentPage = page.split(".")[0];

      const renderedPage = nunjucks.render(`pages/${page}`, {
        groups,
        title: pageTitles[currentPage],
        upcomingEvents
      });

      fs.closeSync(fs.openSync(`${__dirname}/public/${currentPage}.html`, "a"));
      fs.writeFileSync(`${__dirname}/public/${currentPage}.html`, renderedPage);
    });

    console.log("Build completed!");
    return 0;
  } catch (e) {
    console.log(e);
  }
}
function loadEvents() {
  let localEvents = yaml.safeLoad(fs.readFileSync("events.yml", "utf8"));
  return localEvents.filter(event => event.time > Date.now());
}

async function loadMeetupEvents() {
  try {
    let upcomingEvents = [];
    let myFactory = delayFactory({
      delayMs: 500
    });
    let events = groups.filter(group => group.url.includes("meetup.com"));
    for (let event of events) {
      const eventName = event.url.split("/")[3];
      console.log(`fetching ${eventName}`);
      try {
        const response = await myFactory.queueCall(
          `${API}/${eventName}/events?page=7&key=${key}`
        );
        if (response.data.length > 0) {
          for (let item of response.data) {
            const {
              time,
              name,
              description,
              venue,
              group,
              link,
              local_date,
              local_time
            } = item;
            upcomingEvents.push({
              time,
              name,
              description,
              venue,
              group,
              link,
              local_date,
              local_time
            });
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    return upcomingEvents;
  } catch (e) {
    console.log(e);
  }
}
