#!/bin/sh
# Renders every concept at both Meta sizes into out/.
#   cd ads && sh render.sh
# Needs a Chromium browser; Brave is what's installed here. Fonts and the
# logo are local files, so nothing is fetched.
set -e
cd "$(dirname "$0")"
mkdir -p out
B="/Applications/Brave Browser.app/Contents/MacOS/Brave Browser"

for f in a-hook b-relax c-dates; do
  "$B" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=4000 \
    --window-size=1080,1080 --screenshot="out/$f-feed.png"  "file://$PWD/$f.html?size=feed"  2>/dev/null
  "$B" --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=4000 \
    --window-size=1080,1920 --screenshot="out/$f-story.png" "file://$PWD/$f.html?size=story" 2>/dev/null
  echo "rendered $f"
done
