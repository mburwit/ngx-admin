import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import * as countries from 'i18n-iso-countries';

export interface Country {
  readonly alpha2: string;
  readonly alpha3?: string;
  readonly numeric?: number;
}

export interface Locale {
  readonly default: boolean;
  readonly value: string;
  readonly country: Country;
}

const loadLocale = (locale: string, alpha2: string, isDefault: boolean = false): Locale => {
  if (!countries.isValid(alpha2)) {
    throw Error(`Invalid alpha 2 code ${alpha2} for locale ${locale} given.`);
  }

  if (countries.langs().indexOf(locale) < 0) {
    countries.registerLocale(require(`i18n-iso-countries/langs/${locale}.json`));
  }

  return {
    default: isDefault,
    value: locale,
    country: {
      alpha2: alpha2,
      alpha3: countries.alpha2ToAlpha3(alpha2),
      numeric: +countries.alpha2ToNumeric(alpha2),
    },
  };
};

const supportedLocales = (): Locale[] => [
  loadLocale('de', 'DE', true),
  // loadLocale("en", "US", true)
];

const browserLocale = (): Locale => {
  const [locale, alpha2] = navigator.language.split('-');
  return {
    value: locale,
    country: {
      alpha2: alpha2,
    },
  } as Locale;
};

const findLocalesMatchingValue =
  (localeToBeFound: Locale, locales: Locale[]): Locale[] => locales
    .filter(locale => locale.value === localeToBeFound.value);

const findLocalesMatchingAlpha2 =
  (localeToBeFound: Locale, locales: Locale[]): Locale[] => locales
    .filter(locale => locale.country.alpha2 === localeToBeFound.country.alpha2);

const findSimilarSupportedLocales = (locale: Locale): Locale[] | undefined => {
  const foundLocalesMatchingValue = findLocalesMatchingValue(locale, supportedLocales());

  if (foundLocalesMatchingValue && (foundLocalesMatchingValue.length > 0)) {
    const foundLocalesMatchingAlpha2 = findLocalesMatchingAlpha2(locale, foundLocalesMatchingValue);

    if (foundLocalesMatchingAlpha2 && (foundLocalesMatchingAlpha2.length > 0)) {
      return foundLocalesMatchingAlpha2;
    }

    return foundLocalesMatchingValue;
  }

  return undefined;
};

const findSimilarLocaleToBrowserLocale = (): Locale | undefined => {
  const foundSimilarLocales = findSimilarSupportedLocales(browserLocale());

  if (foundSimilarLocales) {
    return foundSimilarLocales[0];
  }

  return undefined;
};

const defaultLocale = (): Locale => {
  const setBrowserLocale = findSimilarLocaleToBrowserLocale();

  if (setBrowserLocale) {
    return setBrowserLocale;
  }

  const defaultSupportedLocale = supportedLocales().find(locale => locale.default);

  if (!defaultSupportedLocale) {
    throw Error('Cannot find default locale among supported locales.');
  }

  return defaultSupportedLocale;
};

const localeName = (locale: Locale, native: boolean = false): string => {
  if (native) {
    return countries.getName(locale.country.alpha2, locale.value);
  }

  return countries.getName(locale.country.alpha2, defaultLocale().value);
};

@Injectable({
  providedIn: 'root',
})
export class LocaleService {

  private readonly _currentLocaleSource: Subject<Locale>;
  private readonly _currentLocaleObservable: Observable<Locale>;

  constructor() {
    this._currentLocaleSource = new BehaviorSubject(this.defaultLocale);
    this._currentLocaleObservable = this._currentLocaleSource.asObservable();
  }

  /**
   *  Returns the default locale.
   */
  get defaultLocale() {
    return defaultLocale();
  }

  /**
   *  Returns the supported locales.
   */
  get supportedLocales() {
    return supportedLocales();
  }

  /**
   *  Returns the full human readable name for the locale in native
   *  language or the default language.
   *
   *  @param locale
   *    Locale for which the name should be returned.
   *  @param native
   *    Indicates whether the name should be returned in native
   *    language or the default language (default).
   */
  getName(locale: Locale, native: boolean = false): string {
    return localeName(locale, native);
  }

  /**
   *  Sets the locale. A set locale will be emitted as answer
   *  of an observable. Everyone who subscribed for locale
   *  changes will receive the set locale.
   *
   *  @param locale
   *    Locale answer to be set (emitted).
   */
  setLocale(locale: Locale): void {
    this._currentLocaleSource.next(locale);
  }

  /**
   *  Returns an observable to which everyone interested in locale
   *  changes can subscribe.
   */
  getLocale(): Observable<Locale> {
    return this._currentLocaleObservable;
  }
}
