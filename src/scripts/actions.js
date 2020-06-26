module.exports = {
    bindImpression: function (element) {
        var printButton = element.querySelector('.js-impression')
        printButton.addEventListener('click', function (event) {
            event.preventDefault()
            try {
                window.print()
            } catch (e) {
                alert('Cette fonctionnalité n’est pas présente sur votre appareil')
            }
        })
    },
    bindChangeProfil: function (element, app) {
        element.addEventListener('click', function (event) {
            event.preventDefault()
            app.basculerVersProfil(element.dataset.profil).then(() => {
                var url = new URL(event.target.href)
                app.router.navigate(url.hash)
            })
        })
    },
    bindNewProfil: function (element, app) {
        element.addEventListener('click', function (event) {
            event.preventDefault()
            var nom = prompt('Pour qui remplissez-vous ce questionnaire ?')
            if (!nom || !nom.trim()) {
                app.router.navigate('introduction')
                return
            }
            app.basculerVersProfil(nom).then(() => {
                var url = new URL(event.target.href)
                app.router.navigate(url.hash)
            })
        })
    },
    bindSuppressionTotale: function (element, app) {
        element.addEventListener('click', function (event) {
            event.preventDefault()
            if (
                confirm('Êtes-vous sûr·e de vouloir supprimer tous les profils ?')
            ) {
                app.supprimerTout().then(() => {
                    app.router.navigate('introduction')
                })
            }
        })
    },
}
