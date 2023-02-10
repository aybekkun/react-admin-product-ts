import { COURSE_DESC, INSTRUMENTS_DESC, FROM, TO, COURSE_NAME, INSTRUMENTS_NAME } from "./helpers/constants/lang/input";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";
import { MAIN, LEADS, CHARTS, INSTRUMENTS, ORDERS, SETTINGS, SUPPORT, COURSES } from "./helpers/constants/lang/sidebar";
import {
  FIO,
  PHONE,
  ACTIONS,
  CLICKED,
  COMMENT,
  DATE,
  DESCRIPTION,
  STATUS,
  LINK,
  NAME,
  DISTRIBUTION,
  PRICE,
} from "./helpers/constants/lang/table";
// don't want to use t=his?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "ru",
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      ru: {
        translation: {
          //sidebar
          add: "Добавить",
          main: MAIN.ru,
          leads: LEADS.ru,
          charts: CHARTS.ru,
          instruments: INSTRUMENTS.ru,
          orders: ORDERS.ru,
          settings: SETTINGS.ru,
          support: SUPPORT.ru,
          courses: COURSES.ru,
          //table
          name: NAME.ru,
          fio: FIO.ru,
          phone: PHONE.ru,
          status: STATUS.ru,
          comment: COMMENT.ru,
          date: DATE.ru,
          actions: ACTIONS.ru,
          description: DESCRIPTION.ru,
          clicked: CLICKED.ru,
          link: LINK.ru,
          distribution: DISTRIBUTION.ru,
          price: PRICE.ru,
          //inputs
          course_name: COURSE_NAME.ru,
          course_desc: COURSE_DESC.ru,
          instruments_desc: INSTRUMENTS_DESC.ru,
          instruments_name: INSTRUMENTS_NAME.ru,
          from: FROM.ru,
          to: TO.ru,
        },
      },
      en: {
        translation: {
          add: "Add",
          main: MAIN.en,
          leads: LEADS.en,
          charts: CHARTS.en,
          instruments: INSTRUMENTS.en,
          orders: ORDERS.en,
          settings: SETTINGS.en,
          support: SUPPORT.en,
          courses: COURSES.en,
          //table
          name: NAME.en,
          fio: FIO.en,
          phone: PHONE.en,
          status: STATUS.en,
          comment: COMMENT.en,
          date: DATE.en,
          actions: ACTIONS.en,
          description: DESCRIPTION.en,
          clicked: CLICKED.en,
          link: LINK.en,
          distribution: DISTRIBUTION.en,
          price: PRICE.en,
          //inputs
          course_name: COURSE_NAME.en,
          course_desc: COURSE_DESC.en,
          instruments_desc: INSTRUMENTS_DESC.en,
          instruments_name: INSTRUMENTS_NAME.en,
          from: FROM.en,
          to: TO.en,
        },
      },
    },
  });

export default i18n;
