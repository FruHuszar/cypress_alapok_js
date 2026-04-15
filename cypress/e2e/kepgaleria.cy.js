describe("képgaléria funkciók", () => {
  it("passes", () => {
    cy.visit("https://nao529.github.io/kepgaleria/");
  });
  it("kepek_megjelenese", function () {
    cy.visit("https://nao529.github.io/kepgaleria/");

    cy.get("div.nagykep img").should("have.length", 1);

    /* azt akarom megnézni annyi kiskép van-e amennyi eleme van a listának */
    cy.get(".kiskepek div.kiskep img").should("have.length", 8);

    /* a nagyképben tényleg az töltődik be ami a istában van? */
    cy.get("div.nagykep img").should(
      "have.attr",
      "src",
      "kepek/kawasaki_ninja_zx6r.jpg",
    );

    /* minden kiskep src attributumában az van-e aminek lennie kell? */
    const KEPLISTA = [
      {
        kep: "kepek/kawasaki_ninja_zx6r.jpg",
        modell: "Kawasaki Ninja ZX-6R",
      },
      {
        kep: "kepek/kawasaki_ninja_h2.jpg",
        modell: "Kawasaki Ninja H2",
      },
      {
        kep: "kepek/yamaha_mt07.jpg",
        modell: "Yamaha MT-07",
      },
      {
        kep: "kepek/indian_scout_bobber.jpg",
        modell: "Indian Scout Bobber",
      },
      {
        kep: "kepek/ducati_monster_1200s.jpg",
        modell: "Ducati Monster 1200S",
      },
      {
        kep: "kepek/honda_cbr_650r.jpg",
        modell: "Honda CBR 650R",
      },
      {
        kep: "kepek/honda_cb500fa.jpg",
        modell: "Honda CB500F",
      },
      {
        kep: "kepek/honda_gsxr750.jpg",
        modell: "Honda GSX-R750",
      },
    ];

    cy.get(".kiskepek div.kiskep img").each((img, index) => {
      expect(img).to.have.attr("src", KEPLISTA[index].kep);
    });
  });
  it("kattintas_kiskepekre", function () {
    cy.visit("https://nao529.github.io/kepgaleria/");
    cy.get(".kiskepek div.kiskep img").each((img, index) => {
      cy.get(".kiskep img")
        .eq(index)
        .invoke("attr", "src")
        .then((src) => {
          cy.get(".kiskep img").eq(index).click();
          cy.get(".nagykep img").should("have.attr", "src", src);
        });
    });
  });
});
