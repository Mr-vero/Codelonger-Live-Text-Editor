			// Full list of configuration options available at:
			// https://github.com/hakimel/reveal.js#configuration
			Reveal.initialize({
				controls: true,
				progress: true,
				history: true,
				center: true,

				transition: 'none', // none/fade/slide/convex/concave/zoom



				// Optional reveal.js plugins
				dependencies: [
					{ src: 'lib/js/classList.js', condition: function() { return !document.body.classList; } },
					{ src: 'plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
					{ src: 'plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
					{ src: 'plugin/highlight/highlight.js', async: true, condition: function() { return !!document.querySelector( 'pre code' ); }, callback: function() { hljs.initHighlightingOnLoad(); } },
					{ src: 'plugin/menu/menu.js', async: true },
					{ src: 'plugin/zoom-js/zoom.js', async: true },
					{ src: 'plugin/notes/notes.js', async: true }
				]




								//menu added
				menu: {
// Specifies which side of the presentation the menu will
// be shown. Use 'left' or 'right'.
side: 'left',
// Add slide numbers to the titles in the slide list.
// Use 'true' or format string (same as reveal.js slide numbers)
numbers: true,
// Hide slides from the menu that do not have a title.
// Set to 'true' to only list slides with titles.
hideMissingTitles: false,
// Add markers to the slide titles to indicate the
// progress through the presentation
markers: false,
// Specify custom panels to be included in the menu, by
// providing an array of objects with 'title', 'icon'
// properties, and either a 'src' or 'content' property.
custom: false,
// Specifies the themes that will be available in the themes
// menu panel. Set to 'false' to hide themes panel.
themes: [
{ name: 'Black', theme: 'css/theme/black.css' },
{ name: 'White', theme: 'css/theme/white.css' },
{ name: 'League', theme: 'css/theme/league.css' },
{ name: 'Sky', theme: 'css/theme/sky.css' },
{ name: 'Beige', theme: 'css/theme/beige.css' },
{ name: 'Simple', theme: 'css/theme/simple.css' },
{ name: 'Serif', theme: 'css/theme/serif.css' },
{ name: 'Blood', theme: 'css/theme/blood.css' },
{ name: 'Night', theme: 'css/theme/night.css' },
{ name: 'Moon', theme: 'css/theme/moon.css' },
{ name: 'Solarized', theme: 'css/theme/solarized.css' }
],
// Specifies if the transitions menu panel will be shown.
transitions: true,
// Adds a menu button to the slides to open the menu panel.
// Set to 'false' to hide the button.
openButton: true,
// If 'true' allows the slide number in the presentation to
// open the menu panel. The reveal.js slideNumber option must
// be displayed for this to take effect
openSlideNumber: true,
// If true allows the user to open and navigate the menu using
// the keyboard. Standard keyboard interaction with reveal
// will be disabled while the menu is open.
keyboard: true,

custom: [
{ title: 'Links', icon: '<i class="fa fa‐external‐link">', src: 'links.html' },
{ title: 'About', icon: '<i class="fa fa‐info">', content: '<p>This slidedeck is created with reveal.js</p>
]
}
});
},
});

			});

