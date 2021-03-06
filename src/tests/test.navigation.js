describe('navigation', function () {
    it('page inconnue renvoie au début', function () {
        chai.expect(navigation.redirectIfMissingData('foo', {})).to.equal(
            'introduction'
        )
    })
    it('ok d’aller à la page d’accueil', function () {
        chai.expect(navigation.redirectIfMissingData('introduction', {})).to.be
            .undefined
    })

    // Question 1 : mon lieu de résidence
    it('ok d’aller à la question 1', function () {
        chai.expect(navigation.redirectIfMissingData('residence', {})).to.be.undefined
    })
    it('ok d’aller à la question 1 même si déjà répondu', function () {
        chai.expect(
            navigation.redirectIfMissingData('residence', {
                _departement: '80',
            })
        ).to.be.undefined
    })

    // Question 2 : mon activité
    it('redirige vers l’accueil si réponse 1 manquante', function () {
        chai.expect(navigation.redirectIfMissingData('activite-pro', {})).to.equal(
            'introduction'
        )
    })
    it('ok d’aller à la question 2 si réponse à la 1', function () {
        chai.expect(
            navigation.redirectIfMissingData('activite-pro', { _departement: '80' })
        ).to.be.undefined
    })
    it('ok d’aller à la question 2 même si déjà répondu', function () {
        chai.expect(
            navigation.redirectIfMissingData('activite-pro', {
                _departement: '80',
                _activite_pro: false,
            })
        ).to.be.undefined
    })

    // Question 3 : mon foyer
    it('redirige vers question 2 si réponse manquante', function () {
        chai.expect(
            navigation.redirectIfMissingData('foyer', { _departement: '80' })
        ).to.equal('activite-pro')
    })
    it('ok d’aller à la question 3 si réponse à la 2', function () {
        chai.expect(
            navigation.redirectIfMissingData('foyer', {
                _departement: '80',
                _activite_pro: false,
            })
        ).to.be.undefined
    })
    it('ok d’aller à la question 3 même si déjà répondu', function () {
        chai.expect(
            navigation.redirectIfMissingData('foyer', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
            })
        ).to.be.undefined
    })

    // Question 4 : mes caractéristiques
    it('redirige vers question 3 si réponse manquante', function () {
        chai.expect(
            navigation.redirectIfMissingData('caracteristiques', {
                _departement: '80',
                _activite_pro: false,
            })
        ).to.equal('foyer')
    })
    it('ok d’aller à la question 4 si réponse à la 3', function () {
        chai.expect(
            navigation.redirectIfMissingData('caracteristiques', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
            })
        ).to.be.undefined
    })
    it('ok d’aller à la question 4 même si déjà répondu', function () {
        chai.expect(
            navigation.redirectIfMissingData('caracteristiques', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
            })
        ).to.be.undefined
    })

    // Question 5 : mes antécédents
    it('redirige vers question 4 si réponse manquante', function () {
        chai.expect(
            navigation.redirectIfMissingData('antecedents', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
            })
        ).to.equal('caracteristiques')
    })
    it('ok d’aller à la question 5 si réponse à la 4', function () {
        chai.expect(
            navigation.redirectIfMissingData('antecedents', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
            })
        ).to.be.undefined
    })
    it('ok d’aller à la question 5 même si déjà répondu', function () {
        chai.expect(
            navigation.redirectIfMissingData('antecedents', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
            })
        ).to.be.undefined
    })

    // Question 6 : mes symptômes actuels
    it('redirige vers question 5 si réponse manquante', function () {
        chai.expect(
            navigation.redirectIfMissingData('symptomes-actuels', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
            })
        ).to.equal('antecedents')
    })
    it('ok d’aller à la question 6 si réponse à la 5', function () {
        chai.expect(
            navigation.redirectIfMissingData('symptomes-actuels', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
            })
        ).to.be.undefined
    })
    it('ok d’aller à la question 6 même si déjà répondu', function () {
        chai.expect(
            navigation.redirectIfMissingData('symptomes-actuels', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: false,
            })
        ).to.be.undefined
    })

    // Question 7 : mes symptômes passés
    it('redirige vers question 6 si réponse manquante', function () {
        chai.expect(
            navigation.redirectIfMissingData('symptomes-passes', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
            })
        ).to.equal('symptomes-actuels')
    })
    it('ok d’aller à la question 7 si réponse négative à la 6', function () {
        chai.expect(
            navigation.redirectIfMissingData('symptomes-passes', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: false,
            })
        ).to.be.undefined
    })
    it('ok d’aller à la question 7 même si déjà répondu', function () {
        chai.expect(
            navigation.redirectIfMissingData('symptomes-passes', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: false,
                _symptomes_passes: true,
            })
        ).to.be.undefined
    })
    it('redirige vers conseils si réponse positive à la 6', function () {
        chai.expect(
            navigation.redirectIfMissingData('symptomes-passes', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: true,
            })
        ).to.equal('conseils-symptomes-actuels')
    })

    // Question 8 : mes contacts à risque
    it('redirige vers question 7 si réponse manquante', function () {
        chai.expect(
            navigation.redirectIfMissingData('contact-a-risque', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: false,
            })
        ).to.equal('symptomes-passes')
    })
    it('ok d’aller à la question 8 si réponse négative aux 6 et 7', function () {
        chai.expect(
            navigation.redirectIfMissingData('contact-a-risque', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: false,
                _symptomes_passes: false,
            })
        ).to.be.undefined
    })
    it('ok d’aller à la question 8 même si déjà répondu', function () {
        chai.expect(
            navigation.redirectIfMissingData('contact-a-risque', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: false,
                _symptomes_passes: false,
                _contact_a_risque: false,
            })
        ).to.be.undefined
    })
    it('redirige vers conseils si réponse positive à la 6', function () {
        chai.expect(
            navigation.redirectIfMissingData('contact-a-risque', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: true,
            })
        ).to.equal('conseils-symptomes-actuels')
    })
    it('redirige vers conseils si réponse positive à la 7', function () {
        chai.expect(
            navigation.redirectIfMissingData('contact-a-risque', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: false,
                _symptomes_passes: true,
            })
        ).to.equal('conseils-symptomes-passes')
    })

    // Sortie 1
    it('ok d’aller à sortie 1 si symptômes actuels', function () {
        chai.expect(
            navigation.redirectIfMissingData('conseils-symptomes-actuels', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: true,
            })
        ).to.be.undefined
    })
    it('redirige sortie 2 -> 1 si symptômes actuels', function () {
        chai.expect(
            navigation.redirectIfMissingData('conseils-symptomes-passes', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: true,
            })
        ).to.equal('conseils-symptomes-actuels')
    })
    it('redirige sortie 3 -> 1 si symptômes actuels', function () {
        chai.expect(
            navigation.redirectIfMissingData('conseils-contact-a-risque', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: true,
            })
        ).to.equal('conseils-symptomes-actuels')
    })
    it('redirige sortie 4 -> 1 si symptômes actuels', function () {
        chai.expect(
            navigation.redirectIfMissingData('conseils', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: true,
            })
        ).to.equal('conseils-symptomes-actuels')
    })

    // Sortie 2
    it('ok d’aller à sortie 2 si symptômes passés', function () {
        chai.expect(
            navigation.redirectIfMissingData('conseils-symptomes-passes', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: false,
                _symptomes_passes: true,
            })
        ).to.be.undefined
    })
    it('redirige sortie 1 -> 2 si symptômes passés', function () {
        chai.expect(
            navigation.redirectIfMissingData('conseils-symptomes-actuels', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: false,
                _symptomes_passes: true,
            })
        ).to.equal('conseils-symptomes-passes')
    })
    it('redirige sortie 3 -> 2 si symptômes passés', function () {
        chai.expect(
            navigation.redirectIfMissingData('conseils-contact-a-risque', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: false,
                _symptomes_passes: true,
            })
        ).to.equal('conseils-symptomes-passes')
    })
    it('redirige sortie 4 -> 2 si symptômes passés', function () {
        chai.expect(
            navigation.redirectIfMissingData('conseils', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: false,
                _symptomes_passes: true,
            })
        ).to.equal('conseils-symptomes-passes')
    })

    // Sortie 3
    it('ok d’aller à sortie 3 si symptômes passés', function () {
        chai.expect(
            navigation.redirectIfMissingData('conseils-contact-a-risque', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: false,
                _symptomes_passes: false,
                _contact_a_risque: true,
            })
        ).to.be.undefined
    })
    it('redirige sortie 1 -> 3 si contact à risque', function () {
        chai.expect(
            navigation.redirectIfMissingData('conseils-symptomes-actuels', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: false,
                _symptomes_passes: false,
                _contact_a_risque: true,
            })
        ).to.equal('conseils-contact-a-risque')
    })
    it('redirige sortie 2 -> 3 si contact à risque', function () {
        chai.expect(
            navigation.redirectIfMissingData('conseils-symptomes-passes', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: false,
                _symptomes_passes: false,
                _contact_a_risque: true,
            })
        ).to.equal('conseils-contact-a-risque')
    })
    it('redirige sortie 4 -> 3 si contact à risque', function () {
        chai.expect(
            navigation.redirectIfMissingData('conseils', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: false,
                _symptomes_passes: false,
                _contact_a_risque: true,
            })
        ).to.equal('conseils-contact-a-risque')
    })

    // Sortie 4
    it('ok d’aller à sortie 4 si ni symptôme ni contact', function () {
        chai.expect(
            navigation.redirectIfMissingData('conseils', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: false,
                _symptomes_passes: false,
                _contact_a_risque: false,
            })
        ).to.be.undefined
    })
    it('redirige sortie 1 -> 4 si ni symptôme ni contact', function () {
        chai.expect(
            navigation.redirectIfMissingData('conseils-symptomes-actuels', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: false,
                _symptomes_passes: false,
                _contact_a_risque: false,
            })
        ).to.equal('conseils')
    })
    it('redirige sortie 2 -> 4 si ni symptôme ni contact', function () {
        chai.expect(
            navigation.redirectIfMissingData('conseils-symptomes-passes', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: false,
                _symptomes_passes: false,
                _contact_a_risque: false,
            })
        ).to.equal('conseils')
    })
    it('redirige sortie 3 -> 4 si ni symptôme ni contact', function () {
        chai.expect(
            navigation.redirectIfMissingData('conseils-contact-a-risque', {
                _departement: '80',
                _activite_pro: false,
                _foyer_enfants: false,
                _sup65: false,
                _antecedent_cardio: false,
                _symptomes_actuels: false,
                _symptomes_passes: false,
                _contact_a_risque: false,
            })
        ).to.equal('conseils')
    })
})
