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

        this.init()
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
}

