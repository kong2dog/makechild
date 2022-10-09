# Core3d

> 3d场景加载框架

## 模块说明

| 模块        | 功能                                             |
| :---------- | :----------------------------------------------- |
| Application | 提供 挂载，切换，销毁场景的能力                  |
| WebglScene  | 场景基类；所有场景需继承WebglScene               |
| Managers    | 各种管理器，如相机管理器 CameraManage相机管理器  |

## 基本用法

```typescript
// DemoScene.ts
import { WebglScene, LightWeightLoader } from '@yushu/core3d';
import * as THREE from '@yushu/three-base';

export default class DemoScene extends WebglScene {
    constructor() {
        super();
    }

    protected Create() {
        this.Scene.add(new THREE.AxesHelper(5000));
        this.Scene.add(new THREE.AmbientLight('#ffffff'));
    }

    protected Update() {}

    protected Destroy() {}
}

```

```typescript
import DemoScene from 'DemoScene';
import { Application } from '../src';

const dom = document.getElementById('app');
const demoScene = new DemoScene();

const app = new Application({ dom, webglScene: demoScene});

```

其他用法

```
//实例化 Application时 webglScene 可以不传
// 可以通过switchToScene 切换场景
app.switchToScene(demoScene);

app.dispose(); // 销毁应用
demoScene.dispose(); // 销毁场景
```

## 一，Application 类

| 方法        | 参数               | 功能说明                              | 返回参数    |
| :---------- | :----------------- | :------------------------------------ | :---------- |
| 构造函数    | appOptions`<br>` | 实例化一个3d应用                      | Application |
| switchScene | WebGLScene`<br>` | 切换/挂载场景                         | void        |
| resize      | width?，height?    | 适配支持变化，一般不用传width和height | void        |
| dispose     | /                  | 销毁应用                              | void        |

类型说明:

interface appOptions {

    dom: HTMLElement;

    webglScene?: WebGLScene;

    defaultWidth?: number;

    defaultHeight?: number;

}

## 二，WebGLScene 类

WebGLScene 继承了[EventDispatcher](https://threejs.org/docs/index.html#api/zh/core/EventDispatcher)

WebGLScene 一般作为基类被继承

#### 1，方法:

| 方法       | 参数             | 功能说明       | 返回参数 |
| :--------- | :--------------- | :------------- | :------- |
| 构造函数   | /                | 实例化一个场景 | void     |
| zoomCamera | 'add'\| 'reduce' | 相机缩放       | void     |
| dispose    | /                | 销毁场景       | void     |

#### 2，生命周期

生命周期 为保护类型方法，只能被存在继承关系的类中调用

| 生命周期 | 执行时机                                                                                         | 入参 | 出参 |
| :------- | :----------------------------------------------------------------------------------------------- | :--- | :--- |
| Init     | 初始化，这时相机，场景，相机控制器，渲染器还没有实例化。                                         | /    | /    |
| Create   | 创建阶段，一般用于创建模型，往场景中加光影，修改相机位置。                                       | /    | /    |
| Update   | 帧调用时会调用Update生命周期函数，每次帧调用时Update会在threejs渲染器渲染前执行。                | /    | /    |
| Destroy  | 当场景实例调用dispose方法销毁场景时会执行Destroy生命周期函数，Destroy会在场景,相机销毁之前执行。 | /    | /    |

## 三，CameraManager 类

| 方法                    | 参数                                                                                                                                                                                          | 功能说明               | 返回参数      |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------- | :------------ |
| 构造函数                | OrbitControls`<br><br>`                                                                                                                                                                     | 实例化一个相机控制器   | CameraManager |
| setCamera`<br>`       | 参数一: box3, 需要看的物体的包围盒Box3;`<br>`参数二: vector,相机视角方向`<br>`参数三: isMoving,`<br>`是否需要推镜头动画`<br>`参数四: scale 缩放比例`<br>` 参数五:up? 是否从上往下看 | 设置一个相机的最佳视角 | void          |
| autoRotateOpen`<br>`  | /                                                                                                                                                                                             | 开启自动旋转           | void          |
| autoRotateClose`<br>` | /                                                                                                                                                                                             | 关闭自动旋转           | void          |

相机管理器还有一些优化点, 未完待续...
