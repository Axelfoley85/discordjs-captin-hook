'use strict'

/* eslint-disable */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const Hook = require('../../valueObjects/hook')
const { hook } = require('../config')
chai.use(chaiAsPromised)
const expect = chai.expect

describe('../../valueObjects/hook.js', () => {
    describe('# toString', () => {
        it('will return expected values', () => {
            return expect(hook.toString()).to.equal(
                '**myTitle**\n*myDM, tier 1 - 2 checkpoints*\nmyDescr'
            )
        })
    })

    describe('# toPollString', () => {
        it('will return expected values', () => {
            return expect(hook.toPollString()).to.equal(
                '**myTitle**, tier 1, myDM'
            )
        })
    })

    describe('# get', () => {
        it('will return expected values', () => {
            return expect(hook.get()).to.deep.equal(
                {
                    title: 'myTitle',
                    dm: 'myDM',
                    tier: 1,
                    checkpoints: 2,
                    description: 'myDescr',
                    userId: 3,
                    guildId: 4,
                    id: 5
                }
            )
        })
    })

    describe('# dbEntry', () => {
        it('will return expected values', () => {
            return expect(hook.dbEntry()).to.deep.equal(
                {
                    title: 'myTitle',
                    dm: 'myDM',
                    tier: 1,
                    checkpoints: 2,
                    description: 'myDescr',
                    userId: 3,
                    guildId: 4
                }
            )
        })
    })
})
