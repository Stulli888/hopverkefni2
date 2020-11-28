# Hópverkefni 2

Til að keyra verkefnið þarf að sækja dependancies með `npm install` og til að keyra það í vafra er notað `npm run dev`.

## Uppsetning verkefnis

Allar skrár sem sjá um stillingar fyrir pakka í verkefninu eru í rót verkefnisins ásamt HTML skrám ásamt einni css skrá sem er notuð til að mála gridið á síðuna. Allur kóði sem við skrifum er vistaður í möppunni src, scss eru í sér undirmöppu þar sem heitir styles. Í src eru nokkrar javascript skrár en þær eru allar tengdar saman útfrá index.js sem er sú skrá sem er tengd við rollup pakkan. Scss skrárnar í styles eru allar tekanar saman í eina undir styles.scss sem er sú skrá sem þýðandinn vinnur með. config.scss heldur utan um ýmsar global breytur t.d. liti og grid-einingar, global er með scss sem nær yfir allt verkefnið og er líka með scss sem ekki þótti þörf að hafa sér skrá fyrir. Grid.scss sér svo um að ítra út dálkum til að setja hluti inná gridið. Kóðinn sem við skrifum er svo þýddur yfir í möppuna dist og er það kóðinn sem síðan er endanlega keyrð á. Rollup fer í index.js og þýðir allt sem hann finnur þar yfir í bundle.js og Sass sér um að breyta scss skránum í src yfir styles.css í dist.

## Aðilar verkefnis

Sturla Freyr Magnússon - Stulli888 - sfm1@hi.is
Brynjólfur Steingrímsson - BrynjolurS - brs26@hi.is


