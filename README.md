## JEPeek
Checks [OpenJDK JEP Index](https://openjdk.org/jeps/0) for last added **JEP**, **Submitted** and **Draft** JEP.

The project is build in [Nuxt](https://nuxt.com/)

### Usage
Visit [http://jepeek.netlify.app](http://jepeek.netlify.app) or fetch [http://jepeek.netlify.app/api/peek](http://jepeek.netlify.app/api/peek) to get the lastest data

Output comes in alike JSON structure:

```json
{
  "fetched": "2024-07-04T18:55:53.491Z",
  "lastJEP": 482,
  "lastSubmitted": 8326035,
  "lastDraft": 8335368
}
```

If something went wrong during scraping data, the return value would be `-1`. Try again in a while.

You're welcome to raise question, report a bug or suggest an improvement via [GitHub issues](https://github.com/AloisSeckar/JEPeek/issues)
