const {Feed} = require("feed")
const fs = require("fs")
class RSS {
    constructor() {
        this.feed = new Feed({
            title: "Certificate invalid",
            description: "A certificate expired or is invalid",
            id: "certcheck.polizei.nrw",
            link: "certcheck.polizei.nrw",
            language: "en", // optional, used only in RSS 2.0, possible values: http://www.w3.org/TR/REC-html40/struct/dirlang.html#langcodes
            image: "http://example.com/image.png",
            favicon: "http://example.com/favicon.ico",
            copyright: "All rights reserved 2023, Cedric Bredau",
            updated: new Date(), // optional, default = today
            generator: "CertCheck", // optional, default = 'Feed for Node.js'
            author: {
                name: "Cedric Bredau",
                email: "c.bredau@pm.me",
                link: ""
            }
        });

        this.feed.addCategory("Certificates about to expire")
        this.feed.addCategory("Expired certificates")
    }
     notify(hostname, certData) {
        const id = "certcheck.polizei.nrw/#"+Math.random()*10000
         this.feed.addItem({
             category: certData.valid?"Certificates about to expire":"Expired Certificates",
             title: hostname+" - certificate expired.",
             id: id,
             link: id,
             description: "Certificate invalid",
             content: JSON.stringify(certData),
             date: new Date(),
         });
        fs.writeFileSync("www/rss.xml",this.feed.rss2())
     }
}

module.exports = RSS
