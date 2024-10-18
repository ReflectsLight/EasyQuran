import { Quran } from "Quran";
import { T } from "~/lib/t";
import { SurahIndex } from "~/components/SurahIndex";
import { render } from "preact";
import { useState, useEffect, useMemo, useRef } from "preact/hooks";
import * as React from "preact/compat";
import classNames from "classnames";
import { Router } from "preact-router";
import "core-js";

const exports = {
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
  console.log(Quran.surahs["en"][0].ayat)
  const Main = (function () {
    const t = T(require("@json/t.json"));
    return () => {
      return (
        <Router>
          <SurahIndex path="/" locale={Quran.locales["en"]} surahs={Quran.surahs["en"]} t={t} />
	  <SurahIndex path="/en" locale={Quran.locales["en"]} surahs={Quran.surahs["en"]} t={t} />
	  <SurahIndex path="/ar" locale={Quran.locales["ar"]} surahs={Quran.surahs["ar"]} t={t} />
        </Router>
      );
    };
  })();

  render(<Main />, document.querySelector(".mount"));
});
