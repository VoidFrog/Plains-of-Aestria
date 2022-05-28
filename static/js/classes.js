class Space {
    constructor(){
        this.scene = new THREE.Scene() 
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 10000)
        this.renderer = new THREE.WebGLRenderer()

        this.init()
        this.create_axes()
    }

    init(){
        this.camera.position.set(0,1000,0)
        this.camera.lookAt(this.scene.position)

        this.renderer.setClearColor(0x2a2a3d)
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        root.append(this.renderer.domElement)
    }

    create_axes(){
        this.axes = new THREE.AxesHelper(1000)
        this.scene.add(this.axes)
    }

    render(){
        requestAnimationFrame(this.render.bind(this))
        console.log('rendering in progress')

        this.renderer.render(this.scene, this.camera)
    }
}

class Board {
    constructor(x, y, z, width, height){
        this.x = x 
        this.y = y 
        this.z = z 
        this.width = width 
        this.height = height
    
        this.geometry;
        this.material;
        this.mesh

        this.init()
    }

    init(){
        const texture = new THREE.TextureLoader().load('../imgs/sandstone_board.jpg')
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(2, 1)

        this.geometry = new THREE.PlaneGeometry(this.width, this.height)
        this.material = new THREE.MeshBasicMaterial({
            color: "0xffffff",
            map: texture

        })

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(this.x, this.y, this.z)
        this.mesh.rotation.x = (Math.PI/180)*270

        space.scene.add(this.mesh)
    }
}

class Card {
    constructor(id){
        //final method will be grabbing stats
        //types, img, ect. from database via ID
        
        //goal is to generate all of the cards
        //and then putting them into local cardsDB

        //decks will be getting the cards via copying
        //cardsDB[unique_id] and putting it into the players local deck


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

        space.scene.add(this.mesh)
    }
}