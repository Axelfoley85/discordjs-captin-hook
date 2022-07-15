'use strict'

/* eslint-disable */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const MessageFormat = require('../../helper/MessageFormat')
const { MessageEmbed } = require('discord.js')
chai.use(chaiAsPromised)
const expect = chai.expect

describe('../../helper/MessageFormat', () => {
    describe('# hookToString', () => {
        it('will return expected values', () => {
            return expect(MessageFormat.hookToString('myTitle', 'myDM', 1, 1, 1, 'myDescr')).to.equal(
                '**myTitle**\n*myDM, tier 1 - 1 checkpoints, 1 treasure points*\nmyDescr'
            )
        })
    })
    describe('# hookToPoll', () => {
        it('will return expected values', () => {
            return expect(MessageFormat.hookToPoll('myTitle', 'myDM', 1)).to.equal(
                '**myTitle**, tier 1, myDM'
            )
        })
    })
    describe('# embedMessageFrom', () => {
        it('will return expected object', () => {
            return expect(MessageFormat.embedMessageFrom('Some text')).to.be.
                instanceof(MessageEmbed)
        })
    })
})