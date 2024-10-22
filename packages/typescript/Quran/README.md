## About

This repository provides a programmer's interface
to The Noble Quran, alongside various translations.

## Examples

### Quran.locales

The `Quran.locales` method provides an object where the
key is a locale name (such as `en`) and the value is a
locale object. The locales returned by this method indicate
what languages the `@0x1eef/Quran` library supports:

```typescript
#!/usr/bin/env node
import Quran from "Quran";
for (locale in Quran.locales) {
  const locale = Quran.locales[locale];
  console.log("The Noble Quran for ", locale.displayName, " speakers");
}
```

### Quran.surahs

The `Quran.surahs` method provides an object where the key
is a locale name (such as `en`) and the value is a surah
object. For example:

```typescript
#!/usr/bin/env node
import Quran from "Quran";
const surah = Quran.surahs["ar"][0]; /* surah: Al-Fatihah */
const ayah = surah.ayat[0].text;     /* ayah: the first ayah of Al-Fatihah */
console.log(ayah.text);
```

## Languages

* Arabic
* English
* Farsi

## Thanks

الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ

* Thanks to the translators:
    - English (The Clear Quran) by Dr. Mustafa Khattab
    - Farsi by Hussain Ansarian

## Install

`@0x1eef/Quran` is available via npm:

	npm i @0x1eef/Quran

## License

The "source code" is released under the terms of the GPL <br>
See [LICENSE](./share/Quran/LICENSE) for details
