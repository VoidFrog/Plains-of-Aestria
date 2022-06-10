export default class Board {
    constructor(x, y, z, width, height, space){
        this.x = x 
        this.y = y 
        this.z = z 
        this.width = width 
        this.height = height
    
        this.geometry;
        this.material;
        this.mesh

        this.space = space //needed for modules
        this.cards = [] //group objects with card and it's stats
        
        this.grid_positions = [] //{x: pos, z: pos} ----- positions for the card grid 
        this.grid_display = []   //meshes representing card grid positions 

        this.init()
        this.create_grid()
    }

    init(){
        const texture = new THREE.TextureLoader().load('../imgs/board.png')
        //texture.wrapS = THREE.RepeatWrapping;
        //texture.wrapT = THREE.RepeatWrapping;
        //texture.repeat.set(2, 1)

        this.geometry = new THREE.PlaneGeometry(this.width, this.height)
        this.material = new THREE.MeshBasicMaterial({
            color: "0xffffff",
            map: texture

        })

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(this.x, this.y, this.z)
        this.mesh.rotation.x = (Math.PI/180)*270

        this.space.scene.add(this.mesh)
    }

    create_grid(){
        for(let row = 0; row < 4; row++){

            for(let col = -3; col < 4; col++){
                let height = window.innerHeight/4.7
                let width = window.innerWidth/10

                let geometry = new THREE.BoxGeometry(width, height, 20)
                let material = new THREE.MeshBasicMaterial({
                    map: this.load_texture('card_placeholder1.png')
                })

                let mesh = new THREE.Mesh(geometry, material)
                mesh.rotation.x = (Math.PI/180) * 270

                let x = -col*window.innerWidth/7
                let y = -8
                let z = row*(height+35) - height*1.8
                mesh.position.set(x, y, z)
                
                mesh.used = false //it's needed to verify card placement on tile, starting with no card on tile -> used=false
                this.grid_display.push(mesh)
                this.grid_positions.push({
                    x: mesh.position.x,
                    z: mesh.position.z
                })

                this.space.scene.add(mesh)                
            }   
        }   
    }

    load_texture(texture_name){
        const texture = new THREE.TextureLoader().load(`../imgs/${texture_name}`)
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);

        return texture
    }

    display_deck(){
        
    }


}

