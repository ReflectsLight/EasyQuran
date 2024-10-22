## About

This repository contains a port of the
[al-quran.reflectslight.io](https://al-quran.reflectslight.io)
website for the mobile operating system
[KaiOS](https://www.kaiostech.com/).
The project is still in the early stages of development.

## Screenshots

**SurahIndex.tsx**

![SurahIndex](/share/al-quran.reflectslight.io/screenshots/240x320_SurahIndex.png)

**SurahStream.tsx**

![SurahStream](/share/al-quran.reflectslight.io/screenshots/240x320_SurahStream.png)

## Development

### Requirements

The following languages have to be installed to build
the website from source:

* Ruby 3.2 (or later)
* NodeJS v18.15 (or later)

### Examples

    # Clone repository
    git clone https://github.com/ReflectsLight/al-quran_kaios
    cd al-quran_kaios

    # Setup build environment
    bin/setup

    # List all tasks
    bundle exec rake -T

    # Build website (dev build)
    bundle exec rake nanoc:build

    # Build website (production build)
    bundle exec rake nanoc:build[production]

    # Start web server
    bundle exec rake server

## Configuration

* **audio.base_url** <br>
  `audio.base_url` controls what web server serves
  audio content.
  [The default](https://audio.al-quran.reflectslight.io/rifai)
  works out of the box. The URL for an audio file is
  resolved by joining `audio.base_url` and
  `/<surahid>/<ayahid>.mp3`. The `audio.base_url` option
  makes it relatively easy to change the reciter
  at build time, before deploying the website.

  The https://audio.al-quran.reflectslight.io endpoint
  provides the following recitations:

  - Mishari bin Rashed Alafasy <br>
  https://audio.al-quran.reflectslight.io/alafasy
  - Ahmad bin Ali Al-Ajmi <br>
  https://audio.al-quran.reflectslight.io/alajmi
  - Sahl Yassin <br>
  https://audio.al-quran.reflectslight.io/yassin
  - Hani ar-Rifai <br>
  https://audio.al-quran.reflectslight.io/rifai

  **Note**<br>
  Due to their overall size the audio files are the only
  files **not** kept in this repository. The audio files
  are hosted  by https://audio.al-quran.reflectslight.io
  instead.

## Thanks

الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ

* Thanks to the graphic artists:
    - [RefreshIcon](/src/js/components/Icon.tsx)
      by
      [Muhammad Haq](https://freeicons.io/profile/823)
* Thanks to the translators:
    - English (The Clear Quran) by Dr. Mustafa Khattab
    - Farsi by Hussain Ansarian
* Thanks to the reciters:
    - Mishari bin Rashed Alafasy
    - Ahmad bin Ali Al-Ajmi
    - Sahl Yassin
    - Hani ar-Rifai
* Thanks to [@farooqkz](https://github.com/farooqkz): <br>
  Farooq introduced me to [KaiOS](https://www.kaiostech.com/) development,
  and the reciter Hani ar-Rifai

## Sources

* [GitHub](https://github.com/ReflectsLight/al-quran_kaios)
* [GitLab](https://gitlab.com/0x1eef/al-quran_kaios)
* [brew.bsd.cafe/@0x1eef](https://brew.bsd.cafe/0x1eef/al-quran_kaios)

## License

The "source code" is released under the terms of the GPL <br>
See [LICENSE](./share/al-quran.reflectslight.io/LICENSE) for details
