<template>
  <div>
    <h1>JEPeek</h1>
    <div>
      Checks <a href="https://openjdk.org/jeps/0">OpenJDK JEP Index</a> for last added <strong>JEP</strong> and <strong>Draft</strong>
    </div>
    <div>
      The website is powered by <a href="https://nuxt.com/">Nuxt</a>
    </div>
    <div>
      Current last JEP:
      <a :href="`https://openjdk.org/jeps/${jepData?.lastJEP}`">{{ jepData?.lastJEP }}</a>
    </div>
    <div>
      Current last Draft:
      <a :href="`https://openjdk.org/jeps/${jepData?.lastDraft}`">{{ jepData?.lastDraft }}</a>
    </div>
    <h2>Usage</h2>
    <div>
      The service is available at <pre>http://jepeek.netlify.app/api/peek</pre>
    </div>
    <div>
      Output looks like <pre>{{ jepData }}</pre>
    </div>
    <div>
      Visit <a href="https://github.com/AloisSeckar/JEPeek">https://github.com/AloisSeckar/JEPeek</a> for more info and contact
    </div>
  </div>
</template>

<script setup lang="ts">
import type { JEPData } from './server/api/peek'

const { data: jepData } = await useFetch<JEPData>('/api/peek')
</script>
