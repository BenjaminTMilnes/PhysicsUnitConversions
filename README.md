# Physics Unit Conversions

This project is a web-app that you can use for converting physical units.

It aims to be as fast and straightforward as possible.

You can view the live app here: www.physicsunitconversions.com

## Why make this at all?

Why bother making a unit conversions site at all? There are already hundreds out there. A quick Google search returns an endless number of unit conversion websites.

One reason: they're all terrible (at least, the ones I could find).

To use most of these unit conversion websites, you first have to choose either the quantity that you want to convert (like length or area) from a drop-down list or list of hyperlinks, then you have to choose the unit you want to convert from (from another drop-down list), then you have to choose the unit you want to convert to (from yet another drop-down list). This is just bad design. You have to click on the screen at least six times before you get the output you want. Why can't you just type the unit symbol and have the website automatically recognise what you typed?

In addition to this, most of the dedicated unit conversion websites that exist are VERY old. They look like they come from the early-2000s internet. Most of them don't have responsive layouts, so can't be viewed or used on phones.

And thirdly, many unit conversion websites will only allow conversions between the most common units. For example, many unit conversion websites don't allow you to convert to or from stone as a unit (which is a fairly common unit in the U.K.). This seems like a pretty fundamental thing to be missing from a unit conversion website.

Google's own unit conversion tool is the most easily accessible on the internet, but that has both the first and third of the failings mentioned above.

So the internet needs a good unit conversion website. Maybe one already exists in some less algorithmically-favoured part of the internet, but I haven't found it yet, so I'm going to assume that it doesn't.

## Principles of the Design

### 1. Minimum Faff

For something as simple as converting a value from one unit to another, I don't want to have to click on the screen six times just to set up the conversion tool that I'm using. I want to just be able to type the value I have, including its units, and for the app to do the rest.

So this app has no drop-down boxes. It just has a single textbox. You type the value you have into the textbox, the app interprets what units you've written and does the rest.

### 2. Maximum Permissiveness

Maybe I don't know the quantity that a particular set of units measures. Maybe I don't know what the symbol for a particular unit is. Or maybe I'm not sure which unit I actually want to convert the value I have to (such as in astronomy, where depending on the size of the value, I might want to express it in astronomical units or parsecs, but I don't know which until I see it). The app shouldn't constrain you to know these things in advance, as it isn't necessary.

So this app automatically figures out what quantity you are describing based on the units you give. It then automatically knows which possible units you might want to convert it to (as you can only convert it to units with the same dimensions). If you don't know the symbol for a unit, you can just write its full name instead, and the app will recognise it. And rather than giving you the output value in the units you specified at the start, the app will figure out which units you're most likely to want it in, and then give you the value in all of them.

### 3. Copy Buttons

Copy buttons are something I have a lot already on www.physicsformulae.com. For any text that I might want to copy to another application, there is a button on the page that will put that text in the clipboard when I click it. Copy buttons remove the faff of having to select the text you want, and then press Ctrl+C. It's a minor thing, and probably saves all of a few milliseconds. But given how easy it is to add to a webpage, why not make this small improvement?

### 4. Proper Symbols

It's annoying that the true times symbol, ×, isn't on the standard keyboard. I need to use this symbol all the time, but instead I have to use an asterisk. The same goes for the true minus symbol.

I want any mathematics I write to look good, so the app uses the true times symbol and the true minus symbol in its output. It also writes its text output using the Unicode superscript numerals, which means that numbers written in standard form will be rendered correctly no matter where I copy the outputs to, even if where I copy them to has no support for mathematical notation.

### 5. Minimalism

So many websites nowadays are just cluttered with adverts and pop-ups and links to other parts of the website. It's infuriating. So this website has none of that. It is a one-page website that has been cleared of all digital clutter.