## JEPeek
Checks [OpenJDK JEP Index](https://openjdk.org/jeps/0) for last added **JEP** and **Draft**

The project is build in [Nuxt](https://nuxt.com/)

### 👀 NOTE!!! 👀
Due to recent changes of https://openjdk.org/jeps/0 website, the project is currently **not working** as intended. I will try to fix it ASAP.

### Usage
Visit [http://jepeek.netlify.app](http://jepeek.netlify.app) or fetch [http://jepeek.netlify.app/api/peek](http://jepeek.netlify.app/api/peek) to get the lastest data

Output comes in alike JSON structure:

```json
{
  "fetched": "2023-11-03T18:34:02.227Z",
  "lastJEP": "463",
  "lastDraft": "8318898"
}
```

If something went wrong during scraping data, the return value would be `-1`. Try again in a while.

You're welcome to raise question, report a bug or suggest an improvement via [GitHub issues](https://github.com/AloisSeckar/JEPeek/issues)
