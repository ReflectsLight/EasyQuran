/**
 * import: preact
 */
import { render, createRef } from "preact";
import * as React from "preact/compat";
import { useState, useEffect, useMemo, useRef } from "preact/hooks";
import Router, { Route } from "preact-router";

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
  forwardRef: React.forwardRef,
  classNames,
};
Object.assign(window, globals);

/**
 * require: components
 */
const { SurahRedirect } = require("~/components/SurahRedirect");
const { SurahIndex } = require("~/components/SurahIndex");
const { SurahStream } = require("~/components/SurahStream");
const { RandomSurah } = require("~/components/RandomSurah");

/**
 * app: routes
 */
const App = (function () {
  const t = T(require("@json/t.json"));
  return () => {
    return (
      /* @ts-expect-error fixme */
      <Router>
        {/* @ts-expect-error fixme */}
        <Route path="/index.html" component={SurahRedirect} />
        {/* @ts-expect-error fixme */}
        <Route path="/:localeId/index.html" component={SurahIndex} t={t} />
        {/* @ts-expect-error fixme */}
        <Route path="/:localeId/:surahId" component={SurahStream} t={t} />
        {/* @ts-expect-error fixme */}
        <Route path="/:localeId/random" component={RandomSurah} />
      </Router>
    );
  };
})();

render(<App />, document.querySelector(".mount")!);
