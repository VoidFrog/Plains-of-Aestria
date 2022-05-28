export default class Space {
    constructor(){
        this.scene = new THREE.Scene() 
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 10000)
        this.renderer = new THREE.WebGLRenderer()

        this.init()
        this.create_axes()
    }

    init(){
        this.camera.position.set(0,1500,0)
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

