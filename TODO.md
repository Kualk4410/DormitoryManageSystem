







作为寝室管理系统的个人全栈开发项目，需严格遵循《系统分析与设计》教材中的**模型驱动思想**和**全流程开发框架**，结合个人开发的资源特点（单人把控全流程、工具轻量化），分阶段落地需求分析、系统设计、开发实现、部署交付四大核心环节。以下从系统分析师视角，按教材章节对应关系，拆解各阶段具体工作：


# 一、项目启动与需求工程（对应教材第2章《需求获取》、第3章《需求描述与规约》）
需求是系统开发的“源头”，个人全栈开发需避免“想当然”设计，需通过规范的需求方法明确**谁用、用什么、怎么用**，最终产出可落地的需求模型。

## 1. 需求获取：明确核心涉众与需求场景
教材核心方法：交互式需求获取（问卷调查、访谈）、非干扰式需求获取（观察法、单据分析法）、非传统需求获取（原型法）。  
### （1）确定涉众与核心需求
寝室管理系统的核心涉众需覆盖3类角色，需针对性挖掘需求：
| 涉众角色 | 核心需求（功能/非功能） | 需求获取方式 |
|----------|--------------------------|--------------|
| 学生     | 1. 查看寝室分配结果；2. 提交报修申请；3. 查看查寝通知；<br>非功能：界面简单、响应快（≤3秒） | 问卷调查（设计10-15题，覆盖需求优先级） |
| 宿管     | 1. 登记学生入住/退宿；2. 记录查寝结果（卫生/违规）；3. 处理报修；<br>非功能：支持批量操作、数据可导出 | 模拟访谈（假设宿管痛点，如“查寝后纸质记录易丢失”） |
| 后勤管理员 | 1. 统计寝室入住率；2. 管理寝室信息（楼号/床位）；3. 导出报表（月度报修统计）；<br>非功能：数据加密、支持多条件查询 | 单据分析法（参考传统寝室管理的Excel表结构） |

### （2）需求梳理：输出“原始需求清单”
将获取的需求按“功能优先级”排序，标注**P0（必须实现）、P1（迭代实现）**，示例：
- P0功能：学生注册登录、宿管入住登记、寝室信息管理、基础查寝记录；
- P1功能：报修流程闭环（学生提交→宿管派单→维修工反馈）、数据可视化统计；
- 非功能：用户密码加密（MD5/SHA256）、支持100人同时在线、兼容Chrome/Firefox浏览器。

### （3）原型法验证需求（非传统需求获取）
个人开发可用轻量化工具（Axure、墨刀，或直接用Figma画低保真原型），快速搭建核心界面（如“宿管查寝录入页”“学生报修页”），通过模拟操作验证需求合理性（例如：宿管是否需要“批量选择违规类型”按钮）。


## 2. 需求描述与规约：构建需求模型（教材核心制品RA-1~RA-6）
需将模糊需求转化为**标准化UML模型**和**可验证的契约**，为后续设计提供明确输入。
### （1）用例模型：明确系统功能边界（RA-1~RA-3）
- **用例图（RA-1）**：用UML工具（StarUML、DrawIO）绘制，核心用例需覆盖3类角色，示例：
  - 学生：「登录系统」「查看寝室信息」「提交报修」；
  - 宿管：「登记入住」「记录查寝」「处理报修」；
  - 管理员：「管理寝室数据」「导出统计报表」；
  - 关系：用`<include>`关联公共用例（如“登录系统”被所有角色包含），用`<extend>`关联可选功能（如“导出报表”是“统计入住率”的扩展）。
- **详细文本用例（RA-3）**：按教材模板编写核心用例（如“登记入住”），需包含：
  - 前置条件：宿管已登录、学生信息已录入（姓名/学号）；
  - 主要过程：宿管输入学号→系统查询学生信息→选择寝室号/床位→提交保存→系统生成入住记录；
  - 扩展事件：若学号不存在（提示“学生信息未录入”）、床位已占用（提示“该床位已分配”）。

### （2）结构与行为模型：明确数据与交互（RA-4~RA-6）
- **概念类图（RA-4）**：提取核心业务实体及关系，示例核心类：
  | 类名       | 核心属性                | 类间关系                  |
  |------------|-------------------------|---------------------------|
  | 学生（Student） | 学号（主键）、姓名、性别 | 与“入住记录”多对一（1学生对应1条当前入住记录） |
  | 寝室（Dorm）   | 寝室号（主键）、楼号、床位数量 | 与“入住记录”一对多（1寝室对应多条入住记录） |
  | 入住记录（CheckIn） | 记录ID（主键）、入住日期、退宿日期 | 与学生/寝室多对一          |
- **用例序列图（RA-5）**：刻画“登记入住”的交互流程，需明确：
  1. 宿管→系统：输入学号（`inputStudentID(String id)`）；
  2. 系统→数据库：查询学生信息（`queryStudent(String id)`）；
  3. 宿管→系统：选择寝室/床位（`selectDorm(String dormId, int bed)`）；
  4. 系统→数据库：保存入住记录（`saveCheckIn(CheckIn record)`）。
- **系统操作契约（RA-6）**：定义核心操作的前后置条件（如“保存入住记录”）：
  - 前置条件：①学号存在；②寝室床位未占用；
  - 后置条件：①创建“入住记录”对象；②更新“寝室”的“已用床位”属性（+1）；③将“学生”与“入住记录”关联。


# 二、系统设计（对应教材第4章《系统设计原则》、第5章《对象交互设计与类的设计》、第6章《数据库设计》）
设计阶段需遵循**高内聚、低耦合**原则，将需求模型转化为“可编码的设计方案”，重点解决“怎么实现”的问题（架构、类、数据库）。

## 1. 架构设计：确定全栈技术栈与分层结构
个人全栈开发需选择**轻量、易维护、文档丰富**的技术栈，建议采用经典三层架构（对应教材“关注点分离”思想）：
| 架构分层 | 技术选择（个人开发推荐） | 核心职责（教材设计原则体现） |
|----------|--------------------------|------------------------------|
| 表现层（前端） | Vue3 + Element Plus（组件丰富，易上手） | 负责用户交互，不包含业务逻辑（高内聚） |
| 业务逻辑层（后端） | SpringBoot 2.x（轻量，自带依赖管理） | 实现核心业务（如入住登记、查寝逻辑），通过接口与前后端解耦（低耦合） |
| 数据访问层（数据库） | MySQL 8.0（开源、易用，替代教材openGauss） | 存储业务数据，通过ORM框架（MyBatis）与业务层解耦 |

## 2. 对象交互与类设计（教材第4、5章：GRASP原则、对象序列图→设计类图）
### （1）职责分配：用GRASP原则确定对象行为
以“处理报修”功能为例，用教材核心模式分配职责：
- **信息专家模式**：“报修单”类（RepairOrder）拥有报修状态、处理结果等信息，因此由它承担“更新报修状态”的职责（`updateStatus(String status)`）；
- **创建者模式**：“宿管”类（DormManager）负责处理报修，因此由它创建“报修处理记录”类（RepairHandleRecord）的实例；
- **控制器模式**：设计“报修控制器”（RepairController），作为前端请求的入口，协调“报修单”“宿管”“维修工”类的交互。

### （2）设计类图：从需求模型到代码骨架
基于概念类图（RA-4）扩展**方法与可见性**，示例核心设计类：
```java
// 学生类（对应数据库表student）
public class Student {
    private String studentId; // 主键
    private String name;
    private String gender;
    // 方法：获取学生当前入住记录（调用CheckInService）
    public CheckIn getCurrentCheckIn(CheckInService service) {
        return service.queryByStudentId(studentId);
    }
}

// 报修单类（对应数据库表repair_order）
public class RepairOrder {
    private String orderId; // 主键
    private String studentId; // 外键（关联学生）
    private String dormId; // 外键（关联寝室）
    private String status; // 状态：待处理/处理中/已完成
    // 方法：更新报修状态（信息专家模式）
    public void updateStatus(String newStatus) {
        this.status = newStatus;
    }
}
```

### （3）对象序列图：细化业务交互流程
以“学生提交报修”为例，绘制对象序列图，明确调用关系：
1. 学生（前端）→RepairController：提交报修（`submitRepair(String studentId, String dormId, String content)`）；
2. RepairController→RepairOrderService：创建报修单（`createOrder(RepairOrder order)`）；
3. RepairOrderService→RepairOrder：初始化报修单（`RepairOrder(String studentId, String dormId)`）；
4. RepairOrderService→Database：保存报修单（`insert(RepairOrder order)`）；
5. RepairController→学生（前端）：返回提交结果（`{code:200, msg:"提交成功"}`）。


## 3. 数据库设计（教材第6章：概念→逻辑→物理模型）
个人开发可简化工具（用Navicat替代PowerDesigner），按教材流程落地：
### （1）概念数据模型（CDM）：E-R图
用Navicat的“模型”功能绘制E-R图，核心实体及关系：
- 学生（1）→入住记录（N）：1个学生可有多条入住记录（历史+当前）；
- 寝室（1）→入住记录（N）：1个寝室可有多条入住记录；
- 报修单（1）→报修处理记录（N）：1个报修单可有多条处理记录（如“派单”“反馈”）。

### （2）逻辑数据模型（LDM）：表结构设计
将E-R图转化为表结构，需满足**第三范式（3NF）**（教材6.2节规范化理论），示例核心表：
| 表名           | 字段名         | 类型         | 约束                 |
|----------------|----------------|--------------|----------------------|
| student        | student_id     | VARCHAR(20)  | 主键                 |
|                | name           | VARCHAR(20)  | 非空                 |
|                | password       | VARCHAR(50)  | 非空（加密存储）     |
| dorm           | dorm_id        | VARCHAR(10)  | 主键                 |
|                | building_no    | VARCHAR(10)  | 非空（楼号）         |
|                | bed_count      | INT          | 非空（总床位）       |
|                | used_bed       | INT          | 非空（已用床位）     |
| repair_order   | order_id       | VARCHAR(32)  | 主键                 |
|                | student_id     | VARCHAR(20)  | 外键（关联student）  |
|                | dorm_id        | VARCHAR(10)  | 外键（关联dorm）     |
|                | status         | VARCHAR(20)  | 非空（待处理/已完成）|

### （3）物理数据模型（PDM）：生成SQL与初始化
- 生成SQL脚本：用Navicat导出表结构SQL，添加索引（如`repair_order`表的`student_id`索引，加速查询学生报修记录）；
- 初始化数据：插入测试数据（如管理员账号、默认寝室信息），示例：
  ```sql
  -- 初始化管理员账号（密码：123456加密后）
  INSERT INTO admin (admin_id, name, password) 
  VALUES ('admin001', '后勤管理员', 'e10adc3949ba59abbe56e057f20f883e');
  -- 初始化寝室数据
  INSERT INTO dorm (dorm_id, building_no, bed_count, used_bed)
  VALUES ('1-101', '1号楼', 4, 0), ('1-102', '1号楼', 4, 2);
  ```


# 三、全栈开发实现（对应教材第7章《面向DevOps的系统开发》）
个人全栈需“一人多角色”，兼顾编码、版本管理、测试，需借助DevOps工具链提升效率（教材7.1节软件开发生产线）。

## 1. 版本管理：单人协作的代码管控（教材7.3.1节）
用Git做版本控制，遵循**Git-Flow简化版**（个人开发无需复杂分支）：
- 主分支（main）：存放可部署的稳定代码；
- 开发分支（dev）：日常开发分支，功能完成后合并到main；
- 操作流程：
  1. 初始化仓库：`git init`，关联远程仓库（Gitee/GitHub，便于备份）；
  2. 开发新功能：`git checkout -b dev`，编码后提交（`git commit -m "完成报修提交功能"`）；
  3. 功能测试通过后：`git checkout main` → `git merge dev`，合并到主分支。

## 2. 前后端开发：按设计落地功能
### （1）后端开发：接口实现与业务逻辑
- 接口设计：用Swagger生成接口文档（便于前端对接），示例“报修提交”接口：
  - 地址：`/api/repair/submit`；
  - 请求方式：POST；
  - 请求体：`{studentId: "2023001", dormId: "1-101", content: "水龙头漏水"}`；
- 业务逻辑实现：按“对象序列图”编写Service层代码，示例`RepairOrderService`：
  ```java
  @Service
  public class RepairOrderService {
      @Autowired
      private RepairOrderMapper repairOrderMapper;
      
      public String createOrder(RepairOrder order) {
          // 生成订单ID（UUID）
          order.setOrderId(UUID.randomUUID().toString().replace("-", ""));
          // 初始状态：待处理
          order.setStatus("待处理");
          // 保存到数据库
          repairOrderMapper.insert(order);
          return order.getOrderId();
      }
  }
  ```

### （2）前端开发：页面与交互
- 页面组件拆分：按“高内聚”原则拆分组件（如`StudentHeader`（学生头部导航）、`RepairForm`（报修表单））；
- 交互实现：调用后端接口，示例“提交报修”的Vue代码：
  ```vue
  <template>
    <el-form ref="repairForm" :model="form" label-width="120px">
      <el-form-item label="寝室号">
        <el-input v-model="form.dormId" readonly></el-input>
      </el-form-item>
      <el-form-item label="报修内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitRepair">提交</el-button>
      </el-form-item>
    </el-form>
  </template>
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  const form = ref({
    studentId: localStorage.getItem('studentId'), // 从本地存储取学号
    dormId: '',
    content: ''
  });
  const submitRepair = async () => {
    try {
      const res = await axios.post('/api/repair/submit', form.value);
      ElMessage.success('提交成功，订单号：' + res.data.orderId);
    } catch (err) {
      ElMessage.error('提交失败：' + err.response.data.msg);
    }
  };
  </script>
  ```

## 3. 测试：个人开发的“质量守门”（教材7.4节测试管理）
个人开发需简化测试流程，但核心测试不可少：
- **单元测试**：用Junit测试后端Service（如`RepairOrderService`的`createOrder`方法，模拟“学号不存在”场景，验证是否返回正确异常）；
- **接口测试**：用Postman测试所有API，覆盖正常/异常场景（如“提交报修时，寝室号不存在”）；
- **UI测试**：手动操作前端页面，验证交互逻辑（如学生提交报修后，宿管页面是否能看到新报修单）。


# 四、部署与交付（教材7.5节部署与交付）
个人开发可选择**轻量部署方案**，无需复杂DevOps工具链：
## 1. 环境准备
- 服务器：选择云服务器（如阿里云学生机，2核2G足够），安装CentOS 7；
- 环境配置：安装JDK 11、MySQL 8.0、Nginx（用于部署前端）。

## 2. 部署步骤
- 后端部署：
  1. 将SpringBoot项目打包为JAR包（`mvn clean package`）；
  2. 上传JAR包到服务器，编写启动脚本（`nohup java -jar dorm-system.jar &`，后台运行）；
- 前端部署：
  1. 打包前端项目（`npm run build`），生成`dist`文件夹；
  2. 配置Nginx，将`dist`文件夹作为静态资源目录，转发API请求到后端（如`/api/*`转发到`http://localhost:8080`）；
- 数据库部署：
  1. 在服务器MySQL中执行初始化SQL，创建表与测试数据；
  2. 修改后端配置文件（`application.yml`），配置服务器MySQL地址/账号/密码。

## 3. 交付文档
输出简化版“用户手册”，包含：
- 各角色登录地址（如学生：`http://服务器IP/student`，宿管：`http://服务器IP/dorm-manager`）；
- 核心操作步骤（如“宿管登记入住”的3步操作：输入学号→选择寝室→提交）；
- 常见问题（如“密码忘记如何重置”）。


# 五、项目管理与维护（教材1.4节软件项目管理）
个人开发需自我把控进度与质量，建议：
1. **进度管理**：用甘特图（Excel或Trello）规划时间，示例：
   - 需求分析（3天）→系统设计（5天）→后端开发（7天）→前端开发（5天）→测试（3天）→部署（2天）；
2. **维护**：
   - 日志管理：后端用Logback记录日志，便于排查问题；
   - 迭代优化：根据使用反馈（如“宿管希望批量导入学生信息”），在`dev`分支开发新功能，测试后合并到`main`分支重新部署。


# 总结
寝室管理系统的个人全栈开发，需以教材的**“模型驱动+全流程管控”** 为核心，从需求模型（用例、类图）到设计方案（架构、数据库），再到开发部署，每一步都需“有依据、可验证”。个人开发虽无团队协作，但通过规范的方法（如UML建模、Git版本管理、分层架构），可保证系统的可维护性与扩展性，避免“写一版、弃一版”的低效开发。