"use strict";(self.webpackChunketk_money=self.webpackChunketk_money||[]).push([[520],{"./src/stories/components/filters/Form.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{InputStory:()=>InputStory,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Form_stories});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),formik_esm=__webpack_require__("./node_modules/formik/dist/formik.esm.js"),chunk_DFWC5MHP=__webpack_require__("./node_modules/@chakra-ui/form-control/dist/chunk-DFWC5MHP.mjs"),chunk_H46NUPBZ=__webpack_require__("./node_modules/@chakra-ui/form-control/dist/chunk-H46NUPBZ.mjs"),chunk_6CVSDS6C=__webpack_require__("./node_modules/@chakra-ui/input/dist/chunk-6CVSDS6C.mjs"),chunk_PULVB27S=__webpack_require__("./node_modules/@chakra-ui/layout/dist/chunk-PULVB27S.mjs"),console=__webpack_require__("./node_modules/console-browserify/index.js");const Component=({field,type="text",validation,error,...props})=>(console.log(props),(0,jsx_runtime.jsx)(formik_esm.D0,{name:field,validate:validation,children:({field:fieldProps})=>(0,jsx_runtime.jsxs)(chunk_DFWC5MHP.MJ,{children:[(0,jsx_runtime.jsx)(chunk_H46NUPBZ.l,{children:field}),(0,jsx_runtime.jsx)(chunk_6CVSDS6C.p,{...fieldProps,type}),error&&error[field]&&(0,jsx_runtime.jsx)(chunk_PULVB27S.az,{children:error[field]})]})})),input=Component;Component.__docgenInfo={description:"",methods:[],displayName:"Component",props:{field:{required:!0,tsType:{name:"string"},description:""},value:{required:!0,tsType:{name:"string"},description:""},type:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'text'",computed:!1}},error:{required:!1,tsType:{name:"any"},description:""},validation:{required:!1,tsType:{name:"signature",type:"function",raw:"()=>{}",signature:{arguments:[],return:{name:"signature",type:"object",raw:"{}",signature:{properties:[]}}}},description:""}}};var chunk_QAITB7GG=__webpack_require__("./node_modules/@chakra-ui/react/dist/chunk-QAITB7GG.mjs"),chunk_UVUR7MCU=__webpack_require__("./node_modules/@chakra-ui/button/dist/chunk-UVUR7MCU.mjs"),Form_stories_console=__webpack_require__("./node_modules/console-browserify/index.js");const Form_stories={title:"Components/Filters/Input",component:storyProps=>(0,jsx_runtime.jsx)(chunk_QAITB7GG.s,{children:(0,jsx_runtime.jsx)(formik_esm.l1,{initialValues:{name:""},onSubmit:()=>{},children:props=>(0,jsx_runtime.jsxs)(formik_esm.lV,{children:[(0,jsx_runtime.jsx)(input,{error:props.errors,...storyProps}),(0,jsx_runtime.jsx)(chunk_UVUR7MCU.$,{type:"submit",children:"Submit"})]})})}),parameters:{layout:"fullscreen"}},InputStory={args:{field:"name",type:"text",validation:value=>(Form_stories_console.log("El mensaje esta mal"),""===value&&"El mensaje esta mal")}},__namedExportsOrder=["InputStory"];InputStory.parameters={...InputStory.parameters,docs:{...InputStory.parameters?.docs,source:{originalSource:'{\n  args: {\n    field: \'name\',\n    type: \'text\',\n    validation: value => {\n      console.log("El mensaje esta mal");\n      return value === "" && "El mensaje esta mal";\n    }\n  }\n}',...InputStory.parameters?.docs?.source}}}}}]);