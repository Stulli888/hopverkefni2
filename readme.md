# Hópverkefni 2

Til að keyra verkefnið þarf að sækja dependancies með `npm install` og til að keyra það í vafra er notað `npm run dev`.
Til þess að skoða stylelint er til staðar `npm run lint` fyrir eslint er `npm run eslint` en til að fá bæði í einu er hægt að keyra `npm run test`

## Uppsetning verkefnis

Allar skrár sem sjá um stillingar fyrir pakka í verkefninu eru í rót verkefnisins ásamt HTML skrám ásamt einni css skrá sem er notuð til að mála gridið á síðuna.
Allur kóði sem við skrifum er vistaður í möppunni src, scss eru í sér undirmöppu þar sem heitir styles og javascript í möppu sem heitir lib. Í src eru nokkrar javascript skrár en þær eru allar tengdar saman útfrá index.js sem er sú skrá sem er tengd við rollup pakkan.

### Stílar

Scss skrárnar í styles eru allar tekanar saman í eina undir styles.scss sem er sú skrá sem þýðandinn vinnur með. config.scss heldur utan um ýmsar global breytur t.d. liti og grid-einingar, global er með scss sem nær yfir allt verkefnið og er líka með scss sem ekki þótti þörf að hafa sér skrá fyrir.
Index heldur utan um stíla sem eru notaðir á forsíðunni.
Video er með stíla fyrir myndabandsspilarann og það sem honum tengist.
Grid.scss sér svo um að ítra út dálkum til að setja hluti inná gridið.
Kóðinn sem við skrifum er svo þýddur yfir í möppuna dist með Sass og er það kóðinn sem síðan er endanlega keyrð á.

### Virkni

Rollup fer í index.js og þýðir allt sem hann finnur þar yfir í bundle.js og Sass sér um að breyta scss skránum í src yfir styles.css í dist.
videoList.js sækir JSON gögn fyrir síðuna og býr til forsíðuna með hlekkjum á myndböndin.
video.js Notar síðan gögnin til að setja rétt myndband í spilarann sem hann býr til og benda á tengd myndbönd
helperFunctions.js er með nytsamleg föll sem gera hluti sem við þurfum að gera mjög oft eins og t.d. að búa til HTML element eða að formata dagsetningar.

## Aðilar verkefnis

Sturla Freyr Magnússon - Stulli888 - sfm1@hi.is
Brynjólfur Steingrímsson - BrynjolurS - brs26@hi.is


