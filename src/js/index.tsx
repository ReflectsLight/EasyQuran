import { Quran } from "Quran";
import { T } from "~/lib/t";
import { SurahIndex } from "~/components/SurahIndex";
import { SurahStream } from "~/components/SurahStream";
import { render } from "preact";
import { useState, useEffect, useMemo, useRef } from "preact/hooks";
import * as React from "preact/compat";
import classNames from "classnames";
import { Router } from "preact-router";
import "core-js";

const exports = {
  Quran,
  React,
  render,
  useState,
  useEffect,
  useMemo,
  useRef,
  classNames,
};
Object.assign(window, exports);

document.addEventListener("DOMContentLoaded", () => {
  const Main = (function () {
    const t = T(require("@json/t.json"));
    return () => {
      return (
        <Router>
          <SurahIndex
            path="/"
            locale={Quran.locales["en"]}
            surahs={Quran.surahs}
            t={t}
          />
          <SurahIndex
            path="/en"
            locale={Quran.locales["en"]}
            surahs={Quran.surahs}
            t={t}
          />
          <SurahIndex
            path="/ar"
            locale={Quran.locales["ar"]}
            surahs={Quran.surahs}
            t={t}
          />
          <SurahIndex
            path="/fa"
            locale={Quran.locales["fa"]}
            surahs={Quran.surahs}
            t={t}
          />
          <SurahStream path="/:localeId/:surahId" t={t} />
        </Router>
      );
    };
  })();

  render(<Main />, document.querySelector(".mount"));
});
