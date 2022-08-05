'use strict'

/* eslint-disable */

const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const { describe } = require('mocha')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const HooksHandler = require('../../helper/HooksHandler')
const db = require('../../models')
const Hook = require('../../valueObjects/hook')
const { hook } = require('../config')
chai.use(chaiAsPromised)
chai.use(sinonChai)
const expect = chai.expect

describe('../../helper/HooksHandler', () => {

    beforeEach( async function () {
        await db.missionHooks.sync({
            force: true
        })
        await db.missionHooks.create(hook.postDbEntry())
    })

    afterEach(() => {
        sinon.restore()
    })

    it('getOne should return hook of id', async () => {
        const expectedHook = new Hook(
            'myTitle',
            'myDM',
            1,
            1,
            'myDescr',
            1
        )
        const response = await HooksHandler.getOne(1)
        let responseHook
        response.forEach(
            (hookItem) => {
                responseHook = new Hook(
                    hookItem.dataValues.title,
                    hookItem.dataValues.dm,
                    hookItem.dataValues.tier,
                    hookItem.dataValues.checkpoints,
                    hookItem.dataValues.description,
                    hookItem.dataValues.id
                )
            }
        )

        expect(responseHook).to.deep.equal(expectedHook)
    })

    it('getHooks should return all hooks in db', async () => {
        const expectedHook = new Hook(
            'myTitle',
            'myDM',
            1,
            1,
            'myDescr',
            1
        )
        const response = await HooksHandler.getHooks()

        expect(response[0]).to.deep.equal(expectedHook)
    })

    it('HooksHandler.delete should output to console log', async () => {
        const deleteStub = sinon.spy(db.missionHooks, 'destroy')
        sinon.spy(console, 'log')
        const id = 1

        await HooksHandler.delete(id)

        sinon.assert.calledOnceWithExactly(
            deleteStub,
            { where: { id: id } }
        )
        expect(console.log).to.have.been.calledWith(id)
    })

    it('HooksHandler.getHookPollLines should return array with hooks', async () => {
        const response = await HooksHandler.getHookPollLines()

        expect(response).to.deep.equal(['**myTitle**, tier 1, myDM'])
    })

    it('HooksHandler.getFullHookDescriptions should return string', async () => {
        const MissionHookstub = sinon.spy(HooksHandler, 'getHooks')

        const response = await HooksHandler.getFullHookDescriptions()
        const cleanedResponse = response.replace(/(\n\n|\n)/gm, '')

        sinon.assert.calledOnce(MissionHookstub)
        sinon.assert.match(
            cleanedResponse,
            '**#1****myTitle***myDM, tier 1 - 1 checkpoints*myDescr'
        )
    })

    it('HooksHandler.getHookDeleteOptions should return array of objects', async () => {
        const MissionHookstub = sinon.spy(HooksHandler, 'getHooks')

        const response = await HooksHandler.getHookDeleteOptions()

        sinon.assert.calledOnce(MissionHookstub)
        sinon.assert.match(
            response,
            [
                { 
                    label: '#1 by myDM',
                    description: 'myTitle...',
                    value: '1'
                } 
            ]
        )
    })
})
