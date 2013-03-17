/*!
 * ------------------------------
 * Doc-it main js
 * license: MIT license (http://opensource.org/licenses/MIT)
 * ------------------------------
 */

// ------------------------------
// table of content
// ------------------------------
// side navigation
//  - sub title
// a method
// ------------------------------

(function( $ ) {
  
  // side navigation
  // ---------------
  // filtering using quicksearch plugin
  $( '#quicksearch' ).quicksearch( '#navigation li:not(.search-skip)' );
  
})( jQuery );
