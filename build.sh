#!/bin/sh
for i in */revealition
do
	(cd $(dirname $i) && sh $(basename $i))
	mkdir -p ../$(dirname $i)
	cat > ../$(dirname $i)/index.html <<REDIRECT
<html>
<head>
<title>redirect</title>
<meta http-equiv="refresh" content="0; url=../git/$(dirname $i)/target/reveal.js/index.html" />
</head>
<body>
</body>
</html>
REDIRECT
done

for i in newsclip/*/revealition
do
	(cd $(dirname $i) && sh $(basename $i))
	mkdir -p ../$(dirname $i)
	cat > ../$(dirname $i)/index.html <<REDIRECT
<html>
<head>
<title>redirect</title>
<meta http-equiv="refresh" content="0; url=../../git/$(dirname $i)/target/reveal.js/index.html" />
</head>
<body>
</body>
</html>
REDIRECT
done
