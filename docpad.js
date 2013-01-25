var docpadConfig,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };


// The DocPad Configuration File
docpadConfig = {
  
  // generated site at the root
  // --------------------------
  // outputPath: '.'

  // Template Data
  // -------------
    
  // These are variables that will be accessible via our templates
  // To access one of these within our templates, refer to the FAQ: https://github.com/bevry/docpad/wiki/FAQ
  templateData: {
    
    // Specify some site properties
    site: {
      
      // The production url of our website
      url: "http://website.com"
        
      // Here are some old site urls that you would like to redirect from
      , oldUrls: ['www.website.com', 'website.herokuapp.com']
  
      // The default title of our website
      , title: "Your Website"
        
      // The website description (for SEO)
      , description: "When your website appears in search results in say Google, the text here will be shown underneath your website's title."
      
      // The website keywords (for SEO) separated by commas
      , keywords: "place, your, website, keywoards, here, keep, them, related, to, the, content, of, your, website"
        
      // The website author's name
      , author: "Your Name"
      
      // The website author's email
      , email: "your@email.com"
      
    }
  
    // Helper Functions
    // ----------------
  
    // Get the prepared site/document title
    // Often we would like to specify particular formatting to our page's title
    // we can apply that formatting here
    , getPreparedTitle: function() {
      
      if (this.document.title) {
        // if we have a document title, then we should use that and suffix the site's title onto it
        return "" + this.document.title + " | " + this.site.title;
      } else {
        // if our document does not have it's own title, then we should just use the site's title
        return this.site.title;
      }
    }
    
    // Get the prepared site/document description
    , getPreparedDescription: function() {
      // if we have a document description, then we should use that, otherwise use the site's description
      return this.document.description || this.site.description;
    }
    
    // Get the prepared site/document keywords
    , getPreparedKeywords: function() {
      // Merge the document keywords with the site keywords
      return this.site.keywords.concat(this.document.keywords || []).join(', ');
    }
    
  }
  
  // Plugins
  // -------
  
  // Enabled Plugins
  , enabledPlugins: {
    
    // enabling highlight js plugin
    highlighjs: true
    
    // enabling sass plugin
    , sass: true
    
  }
  
  // Collections
  // -----------
  // These are special collections that 
  // our website makes available to us
  
  , collections: {
    
    // For instance, this one will fetch in all documents that have pageOrder set within their meta data
    pages: function(database) {
      return database.findAllLive({
        pageOrder: {
          $exists: true
        }
      }, [
        {
          pageOrder: 1,
          title: 1
        }
      ]);
    }
    
    // This one, will fetch in all documents that have the tag "post" specified in their meta data
    , posts: function(database) {
      return database.findAllLive({
        tags: {
          $has: ['post']
        }
      }, [
        {
          date: -1
        }
      ]);
    }
  }
  
  // DocPad Events
  // -------------
  
  // Here we can define handlers for events that DocPad fires
  // You can find a full listing of events on the DocPad Wiki
  , events: {
    
    // Server Extend
    // Used to add our own custom routes to the server before the docpad routes are added
    serverExtend: function(opts) {
      var docpad, latestConfig, newUrl, oldUrls, server;
      
      // Extract the server from the options
      server = opts.server;
      docpad = this.docpad;
      
      // As we are now running in an event,
      // ensure we are using the latest copy of the docpad configuraiton
      // and fetch our urls from it
      latestConfig = docpad.getConfig();
      oldUrls = latestConfig.templateData.site.oldUrls || [];
      newUrl = latestConfig.templateData.site.url;
      
      // Redirect any requests accessing one of our sites oldUrls to the new site url
      return server.use(function(req, res, next) {
        var _ref;
        if (_ref = req.headers.host, __indexOf.call(oldUrls, _ref) >= 0) {
          return res.redirect(newUrl + req.url, 301);
        } else {
          return next();
        }
      });
    }
  }
};

// Export our DocPad Configuration
module.exports = docpadConfig;