<p align="center">
الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
</p>

## About

EasyQuran is a port of the
[al-quran.reflectslight.io](https://al-quran.reflectslight.io)
website as a native
[KaiOS](https://www.kaiostech.com/)
application.
The project is still in the early stages of development.
For a demo please [see the demo video](https://al-quran.reflectslight.io/x/v/EasyQuran/2024.11.19.mp4).
The demo video won't always be based on the most recent version
of the app but it should give you a good idea of how the app works

## Development

### Requirements

The following language runtimes are required to build the website
from source:

* Ruby 3.2 (or later)
* NodeJS v18.15 (or later)

### Examples

    # Clone repository
    git clone https://github.com/ReflectsLight/al-quran.KaiOS
    cd al-quran.KaiOS

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

### Configuration

**audio.base_url** <br>
`audio.base_url` controls what web server serves audio content.
[The default](https://al-quran-audio.reflectslight.io/rifai)
works out of the box. The URL for an audio file is
resolved by joining `audio.base_url` and
`/<surahid>/<ayahid>.mp3`. The `audio.base_url` option
makes it relatively easy to change the reciter
at build time, before building the application.

The https://al-quran-audio.reflectslight.io endpoint
provides the following recitations:

- Mishari bin Rashed Alafasy <br>
	https://al-quran-audio.reflectslight.io/alafasy
- Ahmad bin Ali Al-Ajmi <br>
	https://al-quran-audio.reflectslight.io/alajmi
- Sahl Yassin <br>
	https://al-quran-audio.reflectslight.io/yassin
- Hani ar-Rifai <br>
	https://al-quran-audio.reflectslight.io/rifai

Due to their overall size the audio files are the only
files **not** kept in this repository. The audio files
are hosted by https://al-quran-audio.reflectslight.io
instead.

## Install

In the future I hope that the application could be easily available
through KaiOS store(s), but for now the application is only available
via side-loading the application onto a KaiOS device.

## Credit

**Translations**

* English (The Clear Quran) by Dr. Mustafa Khattab
* Farsi by Hussain Ansarian

**Recitations**

* Mishari bin Rashed Alafasy
* Ahmad bin Ali Al-Ajmi
* Sahl Yassin
* Hani ar-Rifai

**Misc**

* Credit to the graphic artists:
  * [RefreshIcon](/src/js/components/Icon.tsx)
  by
  [Muhammad Haq](https://freeicons.io/profile/823)

* Credit to [@farooqkz](https://github.com/farooqkz): <br>
  Farooq introduced me to [KaiOS](https://www.kaiostech.com/) development

## Sources

* [github.com/@ReflectsLight](https://github.com/ReflectsLight/al-quran.KaiOS)
* [gitlab.com/@ReflectsLight](https://gitlab.com/ReflectsLight/al-quran.KaiOS)
* [brew.bsd.cafe/@ReflectsLight](https://brew.bsd.cafe/ReflectsLight/al-quran.KaiOS)

## License

The "source code" is released under the terms of the GPL <br>
See [LICENSE](./share/al-quran.reflectslight.io/LICENSE) for details
