/**
 * import: preact
 */
import { render, createRef } from "preact";
import * as React from "preact/compat";
import { useState, useEffect, useMemo, useRef } from "preact/hooks";
import Router, { Route } from "preact-router";

/**
 * import: components
 */
import { SurahRedirect } from "~/components/SurahRedirect";
import { SurahIndex } from "~/components/SurahIndex";
import { SurahStream } from "~/components/SurahStream";
import { RandomSurah } from "~/components/RandomSurah";

/**
 * import: libs
 */
import { Quran } from "@0x1eef/quran";
import { T } from "~/lib/t";
import classNames from "classnames";
import "core-js";

/**
 * globals: window
 */
const globals = {
  Quran,
  React,
  render,
  useState,
  useEffect,
  useMemo,
  useRef,
  createRef,
  classNames,
};
Object.assign(window, globals);

/**
 * app: routes
 */
const App = (function () {
  const t = T(require("@json/t.json"));
  return () => {
    return (
      /* @ts-ignore */
      <Router>
	{/* @ts-ignore */}
        <Route path="/index.html" component={SurahRedirect} />
	{/* @ts-ignore */}
        <Route path="/:localeId/index.html" component={SurahIndex} t={t} />
	{/* @ts-ignore */}
        <Route path="/:localeId/:surahId" component={SurahStream} t={t} />
	{/* @ts-ignore */}
        <Route path="/:localeId/random" component={RandomSurah} />
      </Router>
    );
  };
})();

render(<App />, document.querySelector(".mount")!);
