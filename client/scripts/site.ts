/**
 * JavaScript bundle root to be served up to the browser.
 */

import evalRawScript from "./core/eval-raw-script";

import alerts from "./common/alerts";
import checkAllNone from "./common/check-all-none";
import datePicker from "./common/date-picker";
import disabledLinks from "./common/disabled-links";
import editor from "./common/editor";
import fixedDigits from "./common/fixed-digits";
import formSubmit from "./common/form-submit";
import icheck from "./common/icheck";
import lazyImages from "./common/lazy-images";
import pictureInput from "./common/picture-input";
import radioTextField from "./common/radio-text-field";
import select from "./common/select";
import showHide from "./common/show-hide";
import showIfNonempty from "./common/show-if-nonempty";
import sortableTable from "./common/sortable-table";
import syncSlug from "./common/sync-slug";
import syncText from "./common/sync-text";
import tabs from "./common/tabs";
import tagsSelect from "./common/tags-select";
import tooltips from "./common/tooltips";
import userSelect from "./common/user-select";
import warnOnUnsavedChanges from "./common/warn-on-unsaved-changes";

import countdown from "./countdown";

import editEntryDivision from "./entry/edit-entry-division";
import editEntryExternal from "./entry/edit-entry-external";
import editEntryHighscore from "./entry/edit-entry-highscore";
import editEntryLinks from "./entry/edit-entry-links";
import editEntryPlatforms from "./entry/edit-entry-platforms";
import editEntryTeam from "./entry/edit-entry-team";
import viewEntryVoting from "./entry/view-entry-voting";
import editEventStatus from "./event/edit-event-status";
import themeIdeas from "./event/theme-ideas";
import themeShortlist from "./event/theme-shortlist";
import themeVotes from "./event/theme-votes";
import like from "./post/like";
import dashboardEntryImport from "./user/dashboard-entry-import";
import dashboardSettingsTimezone from "./user/dashboard-settings-timezone";

// Keep jQuery exposed for development
(window as any).$ = (window as any).jQuery = $;

// Global exports
// Global JS libraries (using raw-loader when module support is missing)
import "popper.js";
import "bootstrap";
import("select2/dist/js/select2.full.min").then(evalRawScript).catch(e => console.error(e));
import("raw-loader!icheck/icheck.min.js").then(evalRawScript).catch(e => console.error(e));
import("raw-loader!tablesort/dist/tablesort.min.js").then(evalRawScript).catch(e => console.error(e));
import("raw-loader!tablesort/dist/sorts/tablesort.number.min.js").then(evalRawScript).catch(e => console.error(e));

$(function domReady() {

  // Common
  checkAllNone(".js-check-all", ".js-check-none");
  datePicker(".js-date-picker");
  disabledLinks("a.disabled");
  editor(".easymde-editor", ".codemirror");
  fixedDigits();
  formSubmit();
  icheck();
  lazyImages(".js-lazy, .user-contents img");
  alerts("#js-alerts");
  pictureInput();
  radioTextField();
  select();
  showHide(".js-show", ".js-hide");
  showIfNonempty(".js-show-if-nonempty");
  sortableTable();
  syncSlug(".js-sync-slug");
  syncText();
  tabs();
  tagsSelect();
  tooltips("[data-toggle=tooltip]");
  userSelect();
  warnOnUnsavedChanges(".js-warn-on-unsaved-changes");

  // Countdown
  countdown(".js-countdown");

  // Entry
  editEntryDivision();
  editEntryExternal();
  editEntryHighscore();
  editEntryLinks();
  editEntryPlatforms();
  editEntryTeam();
  editEventStatus();
  viewEntryVoting();

  // Event
  editEventStatus();
  themeIdeas();
  themeShortlist();
  themeVotes();

  // Post
  like();

  // User
  dashboardEntryImport();
  dashboardSettingsTimezone();
});
