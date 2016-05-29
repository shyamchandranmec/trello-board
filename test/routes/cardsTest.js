/**
 * Created by shyam on 29/05/16.
 */

"use strict";
let cardModel = app.models.card;

describe("Testing card api's", function () {
    let id = null;
    let position = null;
    let card_group_id = null;
    describe("Create a new card", function () {
        it("Should fail creating a card - [Required properties missing]", function (done) {
            let card = {
            };
            request.post("/cards").send(card)
                .end((err, res) => {
                    expect(res.body).to.exist;
                    expect(res.status).to.equal(400);
                    expect(res.body.error).to.exist;
                    expect(res.body.error).to.equal(true);
                    done();
                })
        });

        it("Should create a card - [Required properties missing]", function (done) {
            let card = {
                title: "New title",
                content: "Test content",
                position: 12,
                card_group_id: 1
            };
            request.post("/cards").send(card)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.be.json;
                    expect(res.status).to.equal(200);
                    expect(res.body).to.exist;
                    expect(res.body.id).to.exist;
                    id = res.body.id;
                    card_group_id = res.body.card_group_id;
                    position = res.body.position;
                    done();
                })
        })
    });


    describe("Re-arrange cards", function () {
        it("Should fail re arranging a card - [Required parameters missing]", function (done) {
            let card = {
                id: "21",
                oldIndex: 1,
                newIndex: 0
            };
            request.put("/cards/21/re-arrange").send(card)
                .end((err, res) => {
                    expect(res.body).to.exist;
                    expect(res.status).to.equal(400);
                    expect(res.body.error).to.exist;
                    expect(res.body.error).to.equal(true);
                    done();
                })

        });

        it("Should re arrange card", function (done) {
            let card = {
                id: id,
                oldIndex: position,
                newIndex: 1,
                cardGroupId: card_group_id
            };
            request.put("/cards/21/re-arrange").send(card)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.be.json;
                    expect(res.status).to.equal(200);
                    expect(res.body).to.exist;
                    expect(res.body.id).to.equal(card.id);
                    expect(res.body.newIndex).to.equal(card.newIndex);
                    expect(res.body.cardGroupId).to.equal(card.cardGroupId);
                    position = res.body.newIndex;
                    done();
                })

        })
    });

    describe("Move card between groups", function () {
        it("Should fail moving a card - [Required parameters missing]", function (done) {
            let card = {
                id: "21",
                fromGroupId: 1,
                toGroupId: 0
            };
            request.put("/cards/21/move").send(card)
                .end((err, res) => {
                    expect(res.body).to.exist;
                    expect(res.status).to.equal(400);
                    expect(res.body.error).to.exist;
                    expect(res.body.error).to.equal(true);
                    done();
                })
        });

        it("Should move card", function (done) {
            let card = {
                id: id,
                fromIndex: position,
                toIndex: 0,
                fromGroupId: card_group_id,
                toGroupId: 2
            };
            request.put("/cards/21/move").send(card)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.be.json;
                    expect(res.status).to.equal(200);
                    expect(res.body).to.exist;
                    expect(res.body.id).to.equal(card.id);
                    expect(res.body.toIndex).to.equal(card.toIndex);
                    expect(res.body.cardGroupId).to.equal(card.toGroupId);
                    cardModel.removeCard(id).then(() => {
                        done();
                    });

                })
        })
    });
})