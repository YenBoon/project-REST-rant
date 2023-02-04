const React = require('react')
const Def = require('./default')

function home () {
    return (
        <Def>
            <main>
                <h1>HOME</h1>
                <div>
                    <img src="/images/birriatacos.jpg" alt="Birria Tacos" />
                    <div>
                    Photo by <a href="https://unsplash.com/@sidralmundet?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Sidral Mundet</a> on <a href="https://unsplash.com/photos/2SK3cOFuwQM?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
                    </div>
                </div>
                <a href="/places">
                    <button className="btn-primary">Places Page</button>
                </a>
            </main>
        </Def>
    )
}

module.exports = home