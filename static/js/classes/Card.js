export default class Card {
    constructor(id, space){
        //final method will be grabbing stats
        //types, img, ect. from database via ID
        
        //goal is to generate all of the cards
        //and then putting them into local cardsDB

        //decks will be getting the cards via copying
        //cardsDB[unique_id] and putting it into the players local deck

        this.space = space

        this.init()
    }

    init(){
        this.geometry = new THREE.PlaneGeometry(window.innerWidth/9, window.innerHeight/3 )
        this.material = new THREE.MeshBasicMaterial({
            color: "0xffffff"
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = (Math.PI/180) * 270
        this.mesh.position.set(0, 100, 0)

        this.space.scene.add(this.mesh)
    }
}

