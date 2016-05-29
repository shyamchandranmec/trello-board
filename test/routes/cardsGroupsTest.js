/**
 * Created by shyam on 29/05/16.
 */

"use strict";
let cardGroupModel = app.models.cardGroup;

describe("Testing cards groups apis", function () {

    let id = null;
    describe("Create a new card group", function () {
        it("Should fail creating a card group - [Required properties missing]", function (done) {
            let card = {
                name: ""
            };
            request.post("/card-groups").send(card)
                .end((err, res) => {
                    expect(res.body).to.exist;
                    expect(res.status).to.equal(400);
                    expect(res.body.error).to.exist;
                    expect(res.body.error).to.equal(true);
                    done();
                })
        });

        it("Should  create a card group", function (done) {
            let card = {
                name: "Test Group"
            };
            request.post("/card-groups").send(card)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.be.json;
                    expect(res.status).to.equal(200);
                    expect(res.body).to.exist;
                    expect(res.body.id).to.exist;
                    expect(res.body.name).to.exist;
                    id = res.body.id;
                    cardGroupModel.removeCardGroup(id).then((res) => {
                        done();
                    })

                })
        });
    })
})