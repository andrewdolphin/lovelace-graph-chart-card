/**
 * lovelace-chart-card 1.0.4
 * https://github.com/zibous/lovelace-graph-chart-card
 *
 * License: MIT
 * Generated on 2020
 * Author: Peter siebler
 */

function formatDate(t,e){const a=new Date(t);function i(t){return t.toString().length<2?"0"+t:t}return"timestamp"==e?a.getUTCFullYear()+"-"+i(a.getUTCMonth()+1)+"-"+i(a.getUTCDate())+" "+i(a.getUTCHours())+":"+i(a.getUTCMinutes())+":"+i(a.getUTCSeconds()):e.replace(/%([a-zA-Z])/g,function(t,e){switch(e){case"Y":return a.getUTCFullYear();case"M":return i(a.getUTCMonth()+1);case"d":return i(a.getUTCDate());case"H":return i(a.getUTCHours());case"m":return i(a.getUTCMinutes());case"s":return i(a.getUTCSeconds());default:throw new Error("Unsupported format code: "+e)}})}function logInfo(t,...e){t&&console.info((new Date).toISOString(),...e)}function localDate(t,e){if(!t)return"";e||(e=navigator.language||navigator.userLanguage||"en-GB");const a=new Date(t.replace(/-/g,"/"));return isNaN(a)?t:new Intl.DateTimeFormat(e).format(a)}function localDatetime(t,e){if(!t)return"";e||(e=navigator.language||navigator.userLanguage||"en-GB");const a=new Date(t);return isNaN(a)?t:new Intl.DateTimeFormat(e,{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"}).format(a)}function timeStampLabel(t,e){if(!t)return"";e||(e=navigator.language||navigator.userLanguage||"en-GB");const a=new Date(t.replace(/-/g,"/"));return isNaN(a)?t:new Intl.DateTimeFormat(e,{month:"short",day:"numeric",hour:"numeric",minute:"numeric"}).format(a).split(",")}function reject(t,e){return Object.keys(t).filter(t=>!e.includes(t)).map(e=>Object.assign({},{[e]:t[e]})).reduce((t,e)=>Object.assign(t,e),{})}function num(t){return t===parseInt(t)?parseInt(t):parseFloat(t).toFixed(2)}function deepMerge(...t){let e={};for(const a of t)if(a instanceof Array)e instanceof Array||(e=[]),e=[...e,...a];else if(a instanceof Object)for(let[t,i]of Object.entries(a))i instanceof Object&&t in e&&(i=deepMerge(e[t],i)),e={...e,[t]:i};return e}const DEFAULT_COLORS=["rgba(237,212,0,0.85)","rgba(115,210,22,0.85)","rgba(245,121,0,0.85)","rgba(52,101,164,0.85)","rgba(89,161,79,0.85)","rgba(182,153,45,0.85)","rgba(73,152,148,0.85)","rgba(225,87,89,0.85)","rgba(121,112,110,0.85)","rgba(211,114,149,0.85)","rgba(176,122,161,0.85)","rgba(157,118,96,0.85)","rgba(52,152,219,0.85)","rgba(46,204,113,0.85)","rgba(241,196,15,0.85)","rgba(155,89,182,0.85)","rgba(26,188,156,0.85)","rgba(39,174,96,0.85)","rgba(41,128,185,0.85)","rgba(142,68,173,0.85)","rgba(44,62,80,0.85)","rgba(230,126,34,0.85)","rgba(231,76,60,0.85)","rgba(236,240,241,0.85)","rgba(149,165,166,0.85)","rgba(243,156,18,0.85)","rgba(211,84,0,0.85)","rgba(192,57,43,0.85)","rgba(229,28,35,0.85)","rgba(205,220,57,0.85)","rgba(52,152,219,0.85)","rgba(231,76,60,0.85)","rgba(155,89,182,0.85)","rgba(241,196,15,0.85)","rgba(46,204,113,0.85)","rgba(26,188,156,0.85)","rgba(52,73,94,0.85)","rgba(230,126,34,0.85)","rgba(127,140,141,0.85)","rgba(39,174,96,0.85)","rgba(41,128,185,0.85)","rgba(142,68,173,0.85)"],COLOR_RADARCHART="rgba(41, 182, 246, 0.45)",COLOR_BUBBLECHAT="rgba(255, 152, 0, 0.685)",randomColor="#"+Math.floor(16777215*Math.random()).toString(16);class chartData{constructor(t){this.chart_type=t.chart_type,this.card_config=t.card_config,this.entities=t.entities,this.entityOptions=t.entityOptions,this.entityData=t.entityData,this.entityNames=t.entityNames,this.stateHistories=t.stateHistories,this.data_dateGroup=t.data_dateGroup||"%Y-%M-%d %H:00:00",this.settings=t.settings,this.chart_locale=t.chart_locale,this.data_aggregate=t.aggregate||"last",this.data_pointStyles=["circle","triangle","rectRounded","rect","rectRot","cross","star","line","dash"],this.indicators={up:"▲",down:"▼",equal:"≃"},this.graphData={}}_getGroupHistoryData(t,e,a){try{if(!t)return;if(t&&!t.length)return;let i={};return t.forEach(function(t){let a=formatDate(t.last_changed,e);i[a]=i[a]||[],t.timestamp=formatDate(t.last_changed,"timestamp"),t.last_changed=a,i[a].push(t)}),Object.keys(i).map(function(t){let e=i[t].filter(t=>t.state&&!isNaN(parseFloat(t.state))&&isFinite(t.state));if(e&&0===e.length)return{y:0,x:""};if("first"==a){const t=e.shift();return{y:num(t.state||0),x:t.last_changed}}if("last"==a){const t=e[e.length-1];return{y:num(t.state||0),x:t.last_changed}}if("max"==a)return e.reduce((t,e)=>t.state>e.state?{y:num(t.state||0),x:t.last_changed}:{y:num(e.state),x:e.last_changed});if("min"==a)return e.reduce((t,e)=>t.state<e.state?{y:num(t.state||0),x:t.last_changed}:{y:num(e.state||0),x:e.last_changed});if("sum"==a){const t=e.reduce((t,e)=>t+num(e.state),0);return{y:num(t||0),x:e[0].last_changed}}if("avg"==a){const t=e.reduce((t,e)=>t+num(e.state),0)/e.length;return{y:num(t||0),x:e[0].last_changed}}return e.map(t=>({y:num(t.state||0),x:t.timestamp}))})}catch(t){console.error("Build Histroydata",t.message,t)}}getDefaultGraphData(){return{data:{labels:[],datasets:[]},config:{secondaryAxis:!1,series:1,gradient:!1,options:{},statistics:{}}}}createScatterChartData(){let t=null,e=this.entities;if(e&&e.length%2==0){(t=this.getDefaultGraphData()).config.mode="simple";for(let a=0;a<e.length;a+=2){const i=e[a];let s={label:i.name||"",unit:i.unit||"",hoverRadius:20,radius:15,hitRadius:20,backgroundColor:i.backgroundColor||DEFAULT_COLORS[20+a],borderColor:i.borderColor||COLOR_BUBBLECHAT};this.entityOptions&&(s={...this.entityOptions,...s},t.config.options=this.entityOptions),this.entityOptions&&void 0!==this.entityOptions.gradient&&(t.config.gradient=!0),s.data=[{x:e[a].state||0,y:e[a+1].state||0}],t.data.datasets.push(s)}t.config.options.scatter=!0}else console.error("ScatterChart setting not valid",this.entities);return t}createBubbleChartData(){let t=null,e=this.entities;if(e&&e.length%3==0){(t=this.getDefaultGraphData()).config.mode="simple";for(let a=0;a<e.length;a+=3){const i=e[a+2];let s={label:i.name||"",scale:i.scale||1,unit:i.unit||"",backgroundColor:i.backgroundColor||COLOR_BUBBLECHAT,borderColor:i.borderColor||COLOR_BUBBLECHAT};this.entityOptions&&(s={...this.entityOptions,...s},t.config.options=this.entityOptions),this.entityOptions&&void 0!==this.entityOptions.gradient&&(t.config.gradient=!0),i&&i.pointStyle&&(s.pointStyle=i.pointStyle,s.pointRadius=6),i&&i.pointRadius&&(s.pointRadius=i.pointRadius),s.data=[{x:e[a].state||0,y:e[a+1].state||0,r:e[a+2].state||0}],t.data.datasets.push(s)}t.config.options.bubble=!0}else console.error("BubbleChart setting not valid",this.entities);return t}createSimpleBarSegmentedData(t){if(t.data&&t.data.length){t.data=t.data.map(t=>Number(t));const e=Math.max(...t.data),a=(Math.min(...t.data),Chart.helpers);return{data:t.data.map(t=>e-t),backgroundColors:t.backgroundColor.map(t=>a.color(t).alpha(.25).rgbString())}}}createChartData(){let t=[];const e=this.entityData.reduce((t,e,a)=>(0==e&&t.push(a),t),[]);if(0===(t=this.entityData.filter((t,a,i)=>!e.includes(a))).length)return console.error("No Histroydata present !"),null;let a={unit:this.data_units||"",mode:"current"},i=this.getDefaultGraphData();i.config.mode="simple",this.entityOptions&&(a={...a,...this.entityOptions}),i.data.labels=this.entityNames.filter((t,a,i)=>!e.includes(a)),i.data.datasets[0]=a,i.data.datasets[0].unit=this.card_config.units||"",i.data.datasets[0].label=this.card_config.title||"","horizontalbar"===this.card_config.chart.toLowerCase()&&(i.data.datasets[0].indexAxis="y");let s=this.entities.map(t=>{if(void 0!==t.color||void 0!==t.backgroundColor)return t.color||t.backgroundColor}).filter(t=>void 0!==t);if(this.entityOptions&&null!=this.entityOptions.gradient&&(i.config.gradient=!0),s.length===i.data.labels.length?(i.data.datasets[0].backgroundColor=s,i.data.datasets[0].showLine=!1):"radar"===this.chart_type?(i.data.datasets[0].backgroundColor=COLOR_RADARCHART,i.data.datasets[0].borderColor=COLOR_RADARCHART,i.data.datasets[0].borderWidth=1,i.data.datasets[0].pointBorderColor=COLOR_RADARCHART,i.data.datasets[0].pointBackgroundColor=COLOR_RADARCHART,i.data.datasets[0].tooltip=!0,i.config.gradient=!1):(s=DEFAULT_COLORS.slice(1,t.length+1),i.data.datasets[0].backgroundColor=s,i.data.datasets[0].borderWidth=0,i.data.datasets[0].showLine=!1),i.data.datasets[0].data=t,i.config.segmentbar=!1,"bar"===this.chart_type&&this.card_config.show&&this.card_config.show.segmented){const t=this.createSimpleBarSegmentedData(i.data.datasets[0]);t&&(i.data.datasets[1]={},i.data.datasets[1].data=t.data,i.data.datasets[1].tooltip=!1,i.data.datasets[1].backgroundColor=t.backgroundColors,i.data.datasets[1].borderWidth=0,i.data.datasets[1].showLine=!1,i.config.segmentbar=0!==t.data.length)}return i}getCurrentGraphData(){try{switch(this.chart_type.toLowerCase()){case"bubble":this.graphData=this.createBubbleChartData();break;case"scatter":this.graphData=this.createScatterChartData();break;default:this.graphData=this.createChartData()}return this.graphData}catch(t){console.error("Current entities GraphData",t.message,t)}return null}getSeriesData(){let t=[];for(const e of this.stateHistories){if(0===e.length)continue;if(!e[0].state)continue;const a=this._getGroupHistoryData(e,this.data_dateGroup,this.data_aggregate);t.push(a)}return t}createHistoryBubbleData(){let t=this.getSeriesData();if(t&&t.length%3==0){let e=this.getDefaultGraphData();for(let a=0;a<t.length;a+=3){const i=this.entities[a+2];let s=[];t[a].forEach(function(e,i){t[a+1][i]&&t[a+2][i]&&s.push({x:parseFloat(t[a+0][i].y)||0,y:parseFloat(t[a+1][i].y||0),r:parseFloat(t[a+2][i].y||0)})});let r={label:i.name||"",unit:i.unit||"",scale:i.scale||1,backgroundColor:i.backgroundColor||COLOR_BUBBLECHAT,borderColor:i.borderColor||COLOR_BUBBLECHAT};i&&i.pointStyle&&(r.pointStyle=i.pointStyle,r.pointRadius=6),i&&i.pointRadius&&(r.pointRadius=i.pointRadius),this.entityOptions&&(r={...r,...this.entityOptions},e.config.options=this.entityOptions),r.data=s,e.data.datasets.push(r)}if(e.data.datasets.length)return e.config.options.bubble=!0,e}return console.error("BubbleChart setting not valid",this.entities),null}createHistoryScatterData(){let t=this.getSeriesData();if(t&&t.length%2==0){let e=this.getDefaultGraphData();e.config.mode="history";for(let a=0;a<t.length;a+=2){const i=this.entities[a];let s=[];t[a].forEach(function(e,i){t[a][i]&&t[a+1][i]&&s.push({x:parseFloat(t[a+0][i].y)||0,y:parseFloat(t[a+1][i].y||0)})});let r={label:i.name||"",unit:i.unit||"",hoverRadius:20,radius:15,hitRadius:20,backgroundColor:i.backgroundColor||DEFAULT_COLORS[10+a],borderColor:i.borderColor||DEFAULT_COLORS[10+a]};i&&i.pointStyle&&(r.pointStyle=i.pointStyle,r.pointRadius=6),i&&i.pointRadius&&(r.pointRadius=i.pointRadius),this.entityOptions&&(r={...r,...this.entityOptions},e.config.options=this.entityOptions),r.data=s,e.data.datasets.push(r)}if(e.data.datasets.length)return e.config.options.bubble=!0,e}return console.error("ScatterChart setting not valid",this.entities),null}createHistoryChartData(){let t=this.getDefaultGraphData();t.config.options.fill=!1,t.config.mode="history";for(const e of this.stateHistories){if(0===e.length)continue;if(!e[0].state)continue;const a=this._getGroupHistoryData(e,this.data_dateGroup,this.data_aggregate),i=e[0].entity_id,s=this.entities.find(t=>t.entity===i);let r=this.data_ignoreZero?a.map(t=>t.y).filter(t=>0!=t):a.map(t=>t.y),n={label:s.name||"unkonwn",unit:s.unit||"",minval:Math.min(...r),maxval:Math.max(...r),sumval:0,avgval:0,current:s.state||0,last_changed:a[0].last_changed||new Date,mode:"history"};if("horizontalbar"===this.card_config.chart.toLowerCase()&&(n.indexAxis="y"),s&&s.pointStyle&&(n.pointStyle=s.pointStyle,n.pointRadius=6),s&&s.pointRadius&&(n.pointRadius=s.pointRadius),this.entityOptions&&(n={...n,...this.entityOptions},t.config.options={...t.config.options,...this.entityOptions}),s&&(n={...n,...s}),void 0!==s.fill?t.config.options.fill=s.fill:s.fill=["bar","horizontalbar"].includes(this.card_config.chart.toLowerCase()),s.fill&&s.gradient&&s.gradient.colors){const e="y"===n.indexAxis?"x":"y";n.gradient={backgroundColor:{axis:e,colors:s.gradient.colors}},n.labelcolor=s.gradient.colors[0],n.borderColor=s.gradient.colors[0]||DEFAULT_COLORS[t.config.series],t.config.gradient=!0}else void 0===s.backgroundColor&&(n.backgroundColor=DEFAULT_COLORS[t.config.series],n.borderColor=DEFAULT_COLORS[t.config.series]);t.config.secondaryAxis||(t.config.secondaryAxis=null!=s.yAxisID||null!=s.xAxisID),n.data=r,t.data.labels=a.map(t=>t.x),t.config.labelType="%Y-%M-%d %H:00:00"===this.data_dateGroup?"timestamp":"default","timestamp"===t.config.labelType&&(t.data.labels=a.map(t=>timeStampLabel(t.x,this.chart_locale))),t.data.datasets.push(n),t.config.series++}return t}getHistoryGraphData(){try{if(this.stateHistories&&this.stateHistories.length){switch(this.chart_type.toLowerCase()){case"bubble":this.graphData=this.createHistoryBubbleData();break;case"scatter":this.graphData=this.createHistoryScatterData();break;default:this.graphData=this.createHistoryChartData()}return this.graphData}}catch(t){console.error("Build History GraphData",t.message,t)}return null}}class graphChart{constructor(t){this.chart=null,this.ctx=t.ctx||null,this.canvasId=t.canvasId,this.card_config=t.card_config,this.chart_locale=t.locale||"de-DE",this.chart_type=t.chart_type||"bar",this.themeSettings=t.themeSettings||{},this.chartconfig=t.chartconfig||{},this.chartCurrentConfig=this.chartconfig,this.loader=t.loader,this.graphData={},this.setting=t.setting,this.chart_ready=!1,this.lastUpdate=null,this.ChartControl=Chart}setThemeSettings(t){return this.themeSettings=t,!0}_setChartDefaults(){try{if(this.ChartControl&&this.ChartControl.defaults&&(this.ChartControl.defaults.responsive=!0,this.ChartControl.defaults.maintainAspectRatio=!1,this.ChartControl.defaults.animation=!1,this.ChartControl.defaults.locale=this.chart_locale,this.ChartControl.defaults&&this.ChartControl.defaults.font&&this.ChartControl.defaults.font.family&&(this.ChartControl.defaults.font.family=this.themeSettings.fontFamily),this.ChartControl.defaults&&this.ChartControl.defaults.color&&(this.ChartControl.defaults.color=this.themeSettings.fontColor,this.ChartControl.defaults.plugins.legend.labels.color=this.themeSettings.fontColor),this.ChartControl.defaults.plugins.legend.position="bottom",this.ChartControl.defaults.plugins.legend.labels.usePointStyle=!0,this.ChartControl.defaults.plugins.legend.labels.boxWidth=8,this.ChartControl.defaults.plugins.tooltip.enabled=!0,this.ChartControl.defaults.plugins.tooltip.backgroundColor=this.themeSettings.tooltipsBackground,this.ChartControl.defaults.plugins.tooltip.titleColor=this.themeSettings.tooltipsFontColor,this.ChartControl.defaults.plugins.tooltip.bodyColor=this.themeSettings.tooltipsFontColor,this.ChartControl.defaults.plugins.tooltip.footerColor=this.themeSettings.tooltipsFontColor,this.themeSettings&&this.themeSettings.showGridLines&&(this.ChartControl.defaults.scale.gridLines.lineWidth=this.themeSettings.gridLineWidth,this.ChartControl.defaults.set&&this.ChartControl.defaults.set("scale",{gridLines:{display:!0,color:this.themeSettings.gridlineColor,drawBorder:!0,borderDash:this.themeSettings.borderDash,zeroLineWidth:8}})),this.ChartControl.defaults.elements&&this.ChartControl.defaults.elements.arc&&(this.ChartControl.defaults.elements.arc.borderWidth=0),this.ChartControl.defaults.elements&&this.ChartControl.defaults.elements.line&&(this.ChartControl.defaults.elements.line.fill=!1,this.ChartControl.defaults.elements.line.tension=0),this.ChartControl.defaults.elements&&this.ChartControl.defaults.elements.point&&(this.ChartControl.defaults.elements.point.radius=0,this.ChartControl.defaults.elements.point.borderWidth=0,this.ChartControl.defaults.elements.point.hoverRadius=8),this.ChartControl.defaults.set))switch(this.chart_type.toLowerCase()){case"radar":this.ChartControl.defaults.set("controllers.radar.scales.r",{ticks:{backdropColor:"transparent"},angleLines:{display:!0,color:this.themeSettings.gridlineColor,lineWidth:this.themeSettings.gridLineWidth},gridLines:{circular:!0}}),this.ChartControl.defaults.set("scale",{gridLines:{display:!0,lineWidth:2*this.themeSettings.gridLineWidth,borderDash:[0]}}),this.ChartControl.defaults.elements.point.hoverRadius=8,this.ChartControl.defaults.elements.point.pointRadius=8;break;case"polararea":this.ChartControl.defaults.set("controllers.polarArea.scales.r",{ticks:{backdropColor:"transparent"},angleLines:{display:!0,color:this.themeSettings.gridlineColor,lineWidth:2*this.themeSettings.gridLineWidth},gridLines:{circular:!0,lineWidth:1.6*this.themeSettings.gridLineWidth,borderDash:[0]}}),this.ChartControl.defaults.set("scale",{gridLines:{display:!0}})}}catch(t){console.error("Error Set Chart defaults for",this.chart_type,": ",t,this.chartCurrentConfig,t,t.message)}}_setChartOptions(){this._setChartDefaults();const t=this.loader;let e={type:this.chart_type,units:this.data_units||"",font:{size:12,style:"normal",lineHeight:1.2,lineWidth:0},layout:{padding:{left:24,right:24,top:0,bottom:24}},chartArea:{backgroundColor:"transparent"},hover:{mode:"nearest",intersect:!0},elements:{point:{radius:.33,hitRadius:8}},spanGaps:!0,plugins:{tooltip:{backgroundColor:this.themeSettings.tooltipsBackground,titleFont:{style:"normal",color:this.themeSettings.tooltipsFontColor},bodyFont:{style:"normal",color:this.themeSettings.tooltipsFontColor},footerFont:{style:"normal",color:this.themeSettings.tooltipsFontColor},animation:!1},legend:{display:this.themeSettings.showLegend||!1,position:"bottom",lineWidth:0,labels:{usePointStyle:!0,boxWidth:8}},scales:{}},animation:{onComplete:function(){t&&(t.style.display="none")}}};if(!0===this.graphData.config.gradient&&"simple"===this.graphData.config.mode&&(e.gradientcolor={color:!0,type:this.chart_type},e.plugins={gradient:gradient}),gradient&&this.graphData.config.gradient&&(e.plugins={gradient:gradient}),this.graphData.config.secondaryAxis&&this.graphData&&this.graphData.data&&this.graphData.data.datasets){let t={};this.graphData.data.datasets.forEach(e=>{e.yAxisID&&(t[e.yAxisID]={},t[e.yAxisID].id=e.yAxisID,t[e.yAxisID].type="linear",t[e.yAxisID].position=e.yAxisID,t[e.yAxisID].display=!0,"right"==e.yAxisID.toLowerCase()&&(t[e.yAxisID].gridLines={borderDash:[2,5],drawOnChartArea:!1})),e.xAxisID&&(t[e.xAxisID]={},t[e.xAxisID].id=e.xAxisID,t[e.xAxisID].type="linear",t[e.xAxisID].position=e.xAxisID,t[e.xAxisID].display=!0,"top"==e.xAxisID.toLowerCase()&&(t[e.xAxisID].gridLines={borderDash:[2,5],drawOnChartArea:!1}))}),t&&(e.scales=t)}if("bubble"===this.chart_type.toLowerCase()){let t=this.card_config.entities[0].name;t+=this.card_config.entities[0].unit?" ("+this.card_config.entities[0].unit+")":"";let a=this.card_config.entities[1].name;a+=this.card_config.entities[1].unit?" ("+this.card_config.entities[1].unit+")":"",e.scales={x:{id:"x",scaleLabel:{display:!0,labelString:t}},y:{id:"y",scaleLabel:{display:!0,labelString:a}}},e.elements={point:{radius:t=>{return.5*t.dataset.data[t.dataIndex]._r}}}}!0===this.graphData.config.segmentbar&&(e.scales={x:{id:"x",stacked:!0},y:{id:"y",stacked:!0}},e.plugins.tooltip.callbacks={label:t=>!1!==t.dataset.tooltip&&t.dataset.label?t.formattedValue+" "+t.dataset.unit||"":null}),this.chartCurrentConfig={type:this.chart_type,data:{labels:[],datasets:[]},options:{}},this.chartconfig.options?this.chartCurrentConfig.options=deepMerge(e,this.chartconfig.options):this.chartCurrentConfig.options=e}renderGraph(t){try{this.graphData?(this._setChartOptions(),this.chartCurrentConfig.data={labels:this.graphData.data.labels,datasets:this.graphData.data.datasets},this.ctx&&this.chartCurrentConfig.data&&this.chartCurrentConfig.options&&(t?this.chart.update({duration:0,easing:"linear"}):(gradient&&this.graphData.config.gradient&&this.ChartControl.register(gradient),this.chartconfig&&this.chartconfig.options&&this.chartconfig.options.chartArea&&""!==this.chartconfig.options.chartArea.backgroundColor&&this.ChartControl.register({id:"chardbackground",beforeDraw:function(t){if(t.config.options.chartArea&&t.config.options.chartArea.backgroundColor){const e=t.chartArea,a=t.ctx;a.save(),a.fillStyle=t.config.options.chartArea.backgroundColor,a.fillRect(e.left,e.top,e.right-e.left,e.bottom-e.top),a.restore()}}}),this.chart&&this.chart.destroy(),this.chart=new Chart(this.ctx,this.chartCurrentConfig),this.chart&&(this.chart_ready=!0)))):console.log("Missing settings or data",this.chartCurrentConfig)}catch(t){console.error("Render Graph Error on ",this.chart_type,": ",t,this.chartCurrentConfig,t,t.message)}}}import"/hacsfiles/chart-card/chart.js?module";const gradient=window["chartjs-gradient"],appinfo={name:"✓ custom:chart-card ",version:"1.0.8",assets:"/hacsfiles/chart-card/assets/"};console.info("%c "+appinfo.name+"     %c ▪︎▪︎▪︎▪︎ Version: "+appinfo.version+" ▪︎▪︎▪︎▪︎ ","color:#FFFFFF; background:#3498db;display:inline-block;font-size:12px;font-weight:300;padding: 6px 0 6px 0","color:#2c3e50; background:#ecf0f1;display:inline-block;font-size:12px;font-weight:300;padding: 6px 0 6px 0");const fireEvent=(t,e,a,i)=>{i=i||{},a=null==a?{}:a;const s=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return s.detail=a,t.dispatchEvent(s),s};class ChartCard extends HTMLElement{constructor(){super(),this._hass=null,this._config=null,this.attachShadow({mode:"open"}),this.card_icon=null,this.card_title=null,this.card_height=240,this.theme="",this.themeSettings=null,this.graphChart=null,this.chart_type="bar",this.chart_locale="de-DE",this.chart_update=!1,this.ctx=null,this.chartconfig=null,this.graphData={},this.hassEntities=[],this.entities=[],this.entityOptions=null,this.entity_ids=[],this.entityData=[],this.entityNames=[],this.data_hoursToShow=0,this.data_group_by="day",this.data_dateGroup=null,this.data_ignoreZero=!1,this.data_units="",this.startTime=new Date,this.lastEndTime=new Date,this.skipRender=!1,this.lastUpdate=null,this.ready=!1,this.loginfo_enabled=!0,this._initialized=!1}_dateFormatPattern(t){const e=[];return e.timestamp="timestamp",e.day="%Y-%M-%d",e.hour="%Y-%M-%d %H:00:00",e.month="%Y-%M",e.year="%Y",t in e?e[t]:e.timestamp}_evaluateCssVariable(t){try{return getComputedStyle(document.documentElement).getPropertyValue(t).trim()}catch(e){console.log("ERROR evaluateCssVariable:",t,"ERROR",e.message,e)}return t}_setDefaultThemeSettings(){this.themeSettings={theme:{theme:"system",dark:!1},fontColor:"#333333",fontFamily:"Quicksand, Roboto,'Open Sans','Rubik','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",gridlineColor:"#DCDCDC",zeroLineColor:"#555555",tooltipsBackground:"#ecf0f1",tooltipsFontColor:"#647687",showLegend:["pie","doughnut","polararea","line","bubble","scatter"].includes(this.chart_type.toLowerCase())||!1,showGridLines:["bar","line","bubble","scatter"].includes(this.chart_type.toLowerCase())||!1,secondaryAxis:!1,gridLineWidth:.18,borderDash:[2]}}_setChartTheme(){}_getThemeSettings(){this._setDefaultThemeSettings();try{return this.themeSettings={fontColor:this.chart_themesettings&&this.chart_themesettings.fontcolor||this._evaluateCssVariable("--chartjs-text-fontColor")||this._evaluateCssVariable("--primary-text-color")||this.themeSettings.fontFamily,fontFamily:this._evaluateCssVariable("--chartjs-fontFamily")||this._evaluateCssVariable("--paper-font-common-base_-_font-family")||"Quicksand, Roboto,'Open Sans','Rubik','Helvetica Neue', 'Helvetica', 'Arial', sans-serif",gridlineColor:this.chart_themesettings&&this.chart_themesettings.gridlinecolor||this._evaluateCssVariable("--chartjs-gridline-color")||this._evaluateCssVariable("--light-primary-color")||this.themeSettings.gridlineColor,zeroLineColor:this.chart_themesettings&&this.chart_themesettings.zerolinecolor||this._evaluateCssVariable("--chartjs-zero-gridline-color")||this._evaluateCssVariable("--dark-primary-color")||this.themeSettings.zeroLineColor,tooltipsBackground:this.chart_themesettings&&this.chart_themesettings.tooltipsbackground||this._evaluateCssVariable("--chartjs-tooltip-background")||this.themeSettings.tooltipsBackground,tooltipsFontColor:this.chart_themesettings&&this.chart_themesettings.tooltipsfontcolor||this._evaluateCssVariable("--chartjs-text-fontcolor")||this.themeSettings.tooltipsFontColor,showLegend:["pie","doughnut","polararea","line"].includes(this.chart_type.toLowerCase())||this.themeSettings.showLegend,showGridLines:["bar","line","bubble","scatter"].includes(this.chart_type.toLowerCase())||this.showGridLines,secondaryAxis:!1,themecolor:this._evaluateCssVariable("--chartjs-theme")||!1,charttheme:null!==this.chart_themesettings},void 0!==this.theme&&void 0!==this.theme.dark||(this.theme={theme:"system",dark:"dark"===this.themeSettings.themecolor||!1},this.themeSettings.theme=this.theme),this.theme&&null!=this.theme.dark&&(this.themeSettings.theme=this.theme),this.themeSettings.gridLineWidth=this.themeSettings.theme.dark?.18:.45,this.themeSettings.borderDash=this.themeSettings.theme.dark?[2]:[0],this._config.options&&this._config.options.scale&&this._config.options.scale.gridLines&&(this.themeSettings.showGridLines=!0),this._config.options&&this._config.options.legend&&(this.themeSettings.showLegend=!0),!0}catch(t){console.error("Fatal Error theme settings",t.message,t)}return!1}_setChartConfig(){let t={};if(t.type=this.chart_type,this._config.options&&(t.options={},t.options=this._config.options),this.chartconfig=t,this._getThemeSettings(),this.ctx){let t={ctx:this.ctx,canvasId:this.canvasId,card_config:this._config,chart_locale:this.chart_locale,chart_type:this.chart_type,themeSettings:this.themeSettings,chartconfig:this.chartconfig,setting:this._config,loader:this.loader};this.graphChart=new graphChart(t)}else console.error("No chart.js container found !")}_creatHACard(){this.id="i"+Math.random().toString(36).substr(2,3).toLocaleLowerCase();const t=document.createElement("ha-card");t.id=this.id+"-card",t.setAttribute("data-graphtype",this.chart_type),this.chart_themesettings&&this.chart_themesettings.cardbackground&&(t.style.cssText+=`background: ${this.chart_themesettings.cardbackground} !important;`);const e=document.createElement("div"),a=document.createElement("canvas");if(this.ctx=a.getContext("2d"),this.canvasId=this.id+"-chart",this.card_title||this.card_icon){const e=document.createElement("div");if(e.setAttribute("class","card-header header flex"),e.id=this.id+"-header",e.style.cssText="padding-bottom:0 !important;white-space:nowrap",this.card_icon){const t=document.createElement("ha-icon");t.setAttribute("icon",this.card_icon),t.style.cssText="position:relative;top:-2px;padding:0 6px 0 4px;",e.appendChild(t)}if(this.card_title){const t=document.createElement("span");t.style.cssText="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:inline-block;vertical-align:top;width:70%",t.innerHTML=this.card_title,e.appendChild(t)}t.append(e)}e.id=this.id+"-view",e.style.height=this.card_height+"px",e.style.width="100%",e.style.overflow="auto",a.id=this.canvasId,a.height=this.card_height,a.style.cssText="-moz-user-select: none; -webkit-user-select: none; -ms-user-select: none;",this.loaderart&&(this.loader=document.createElement("img"),this.loader.id=this.id+"-loader",this.loader.alt="loading...",this.loader.style.width="60",this.loader.src=appinfo.assets+this.loaderart+".svg",this.loader.style.cssText="position:absolute;top:42%;left:38%;width:60px;z-index:500;margin: 0 auto"),this.chart_showstate&&(this.currentData=document.createElement("div"),this.currentData.id=this.id+"state-view",this.currentData.style.cssText="position:absolute;top:12px;right:24px;background-color:transparent;z-index:100;"),this.chart_showdetails&&(this.detailData=document.createElement("div"),this.detailData.style.cssText="padding:12px 50px;border-top:1px dotted",this.detailData.id=this.id+"detail-info",this.currentData.setAttribute("data-view",this.detailData.id)),e.appendChild(a),this.loader&&e.append(this.loader),this.chart_showdetails&&this.detailData&&e.append(this.detailData),t.appendChild(e),this.chart_showstate&&this.currentData&&t.appendChild(this.currentData),this.card_timestamp&&(this.timestampLayer=document.createElement("div"),this.timestampLayer.id=this.id+"detail-footertext",this.timestampLayer.style.cssText="position:absolute;right:0.8em;bottom:0;font-weight:200;font-size:0.7em;text-align:right;z-index:800",this.timestampLayer.innerHTML=localDatetime((new Date).toISOString()),t.appendChild(this.timestampLayer)),this.root.appendChild(t)}_checkLocale(t){try{Intl.getCanonicalLocales(t)}catch(t){return console.error(" RangeError: invalid language tag:",this.config),navigator.language||navigator.userLanguage}return t}setConfig(t){if(!t.entities)throw new Error("You need to define an entity");try{for(this.root=this.shadowRoot;this.root.hasChildNodes();)this.root.removeChild(root.lastChild);if(this._config)return void console.log("CHART-CART Config",t.title," allready loaded");this._config=t,this.loginfo_enabled=this._config.loginfo||!1,this.card_title=this._config.title||"",this.card_icon=this._config.icon||null,this.card_height=this._config.height||240,this.card_timestamp=this._config.cardtimestamp||!0,this.chart_type=this._config.chart||"bar",this.chart_showstate=this._config.showstate||!1,this.chart_showstate=!0===this.chart_showstate?"right":this.chart_showstate,this.chart_showstate&&(["left","right","center"].includes(this.chart_showstate.toLowerCase())||(this.chart_showstate=!1)),this.chart_showdetails=this._config.showdetails,this.chart_themesettings=this._config.theme||null,this.loaderart=this._config.loader||"three-dots",["audio","ball-triangle","bars","circles","grid","hearts","oval","pfuff","rings","spinning-circles","tail-spin","three-dots"].includes(this.loaderart)||(this.loaderart="spinning-circles");const e=["line","radar","bar","horizontalBar","pie","doughnut","polarArea","bubble","scatter"];if(!this.chart_type)throw new Error("You need to define type of chart");if(!e.includes(this.chart_type))throw new Error("Invalid config for 'chart:'"+this.chart_type+". Available options are: "+e.join(", "));"horizontalbar"===this.chart_type.toLowerCase()&&(this.chart_type="bar");const a=navigator.language||navigator.userLanguage||"en-GB";this.chart_locale=this._config.locale||a,this._checkLocale(),this.data_hoursToShow=this._config.hours_to_show||0,this.show=this._config.show||{},"line"===this.chart_type&&0===this.data_hoursToShow&&(this.data_hoursToShow=168),this.data_group_by=this._config.group_by||"day",this.data_dateGroup=this._dateFormatPattern(this.data_group_by),this.data_aggregate=this._config.aggregate||"last",this.data_ignoreZero=this._config.ignoreZero||!1,this.data_units=this._config.units||"",["bubble","scatter"].includes(this.chart_type.toLocaleLowerCase())?this.chart_showstate=!1:0===this.data_hoursToShow&&this.chart_showstate&&(this.chart_showstate=null),this._creatHACard(),this._initialized=!0,this.updating=!1}catch(e){console.log(e.message,t,e)}}set hass(t){if(void 0!==t&&this._initialized&&(this._hass=t,this.selectedTheme=t.selectedTheme||{theme:"system",dark:!1},this.theme&&this.theme.dark!==this.selectedTheme.dark&&(this.theme=this.selectedTheme,this._getThemeSettings(),this.graphChart&&(this.themeSettings.theme=this.theme,this.graphChart.setThemeSettings(this.themeSettings),this._getHistory())),this.theme=this.selectedTheme,this.graphChart||(this._getThemeSettings(),this.themeSettings.theme=this.theme,this._setChartConfig()),this.hassEntities=this._config.entities.map(e=>t.states[e.entity]).filter(t=>void 0!==t),this.hassEntities&&0!==this.hassEntities.length&&(this.updateData(),!this.skipRender))){if(this.entityData=this.hassEntities.map(t=>void 0===t?0:t.state),this.entityOptions=null,!1===this.ready&&this.entities.length!==this.hassEntities.length){this.entities=[];for(let t of this._config.entities)if(t.options)this.entityOptions=t.options;else{const e=this.hassEntities.find(e=>e.entity_id===t.entity);if(e){let a=Object.assign({},t);null==a.name&&e.attributes&&(a.name=e.attributes.friendly_name||a.name,a.unit=e.attributes.unit_of_measurement||a.unit||""),void 0!==a.name&&(a.last_changed=e.last_changed||this.startTime,a.state=e.state||0,this.entities.push(a),this.entity_ids.push(t.entity))}}this.ready=0!==(this.entity_ids&&this.entity_ids.length)}this.entityNames=this.entities.map(e=>void 0!==e.name?e.name:void 0!==t.states[e.entity].attributes.friendly_name?t.states[e.entity].attributes.friendly_name:e.entity),0==this.skipRender&&this._initialized&&(this._getThemeSettings(),this.themeSettings.theme=this.theme,this.graphChart.setThemeSettings(this.themeSettings),this._getHistory(),this.skipRender=!0,this.updating=!1)}}updateData(){if(this.updating)return!1;if(this.hassEntities&&this.hassEntities.length&&this._hass){this.hasChanged=!1,this.updating=!0,this.hassEntities=this._config.entities.map(t=>this._hass.states[t.entity]).filter(t=>void 0!==t);for(let t of this.entities){const e=this.hassEntities.find(e=>e.entity_id===t.entity);t.laststate=t.state,t.update=!1,e&&t.last_changed!==e.last_changed&&(t.last_changed=e.last_changed,t.state=e.state,t.update=!0,this.hasChanged=!0)}return this.hasChanged&&(this._getThemeSettings(),this.graphChart.setThemeSettings(this.themeSettings),this._getHistory(),this.card_timestamp&&(this.timestampLayer.innerHTML=localDatetime((new Date).toISOString()))),this.updating=!1,this.hasChanged}}_getHistory(){if(this.ready)if(this.data_hoursToShow&&this.data_hoursToShow>0&&this.entity_ids.length){let t;this.chart_update?t=this.lastEndTime:(t=new Date).setHours(t.getHours()-this.data_hoursToShow);let e=new Date;this.lastEndTime=e;const a=t.toISOString()+"?end_time="+e.toISOString()+"&filter_entity_id="+this.entity_ids.join(",");this.lastUpdate=(new Date).toISOString();let i="history/period/"+a+"&minimal_response";this._hass.callApi("GET",i).then(t=>this._buildGraphData(t,1),()=>null)}else this.lastUpdate=(new Date).toISOString(),this._buildGraphData(null,2)}renderStateData(t){if(this.currentData&&this.chart_showstate&&t){let e="margin:0;line-height:1.2em",a=[];a.push('<div style="font-weight:400;margin:0;cursor:pointer;height:4.5em;overflow:auto">');for(const i of t){let t=' style="'+e+";color:"+i.color+'"';a.push('<div class="stateitem" id="'+i.name+'"'+t+'">'),a.push('<p style="font-size:2.0em;line-height:1.2em;text-align:right;margin:0;border-bottom: 1px dotted '+i.color+';">'+i.current+'<span style="font-size:0.5em;vertical-align:top">'+i.unit+"</span></p>"),a.push('<p style="font-size:0.85em;text-align:center;margin:0;line-height:2em">'+i.name+"</p>"),a.push("</div>")}if(a.push("</div>"),this.currentData.innerHTML=a.join(""),this.detailData){a=[],this.chart_showdetails.title&&a.push("<h2>"+this.chart_showdetails.title+"</h2>"),a.push('<div><table style="margin: 0 auto;font-size:0.95em;font-weight:300;border-spacing:10px;border-collapse: separate;table-layout: fixed;">'),a.push('<tbody><tr style="text-align:left;font-size:1.0em">'),a.push('<th width="30%"><b>Statistics</b></th>'),a.push('<th style="padding: 0 24px;">Min</th>'),a.push('<th style="padding: 0 24px;">Max</th>'),a.push('<th style="padding: 0 24px;">Current</th>'),a.push('<th style="padding: 0 24px;">Date</th>'),a.push("</tr>");for(const e of t)a.push("<tr>"),a.push('<td><span style="font-size:4em;color:'+e.color+';vertical-align:top;padding-right:8px">&bull;</span>'+e.name+"</td>"),a.push("<td align='right'>"+e.min+" "+e.unit+"</td>"),a.push("<td align='right'>"+e.max+" "+e.unit+"</td>"),a.push("<td align='right'>"+e.current+" "+e.unit+"</td>"),a.push("<td>"+localDatetime(e.timestamp,this.chart_locale)+"</span>"),a.push("</tr></tbody>");a.push("</table></div><br/>"),a.length&&(this.detailData.innerHTML=a.join(""))}}}_buildGraphData(t,e){if(1===e&&!t||t&&!t.length)return null;const a=new chartData({chart_type:this.chart_type,card_config:this._config,entities:this.entities,entityOptions:this.entityOptions,entityData:this.entityData,entityNames:this.entityNames,stateHistories:t,data_dateGroup:this.data_dateGroup,data_aggregate:this.data_aggregate,setting:this._config,chart_locale:this.chart_locale,lastUpdate:this.lastUpdate});if(this.graphData=1===e?a.getHistoryGraphData():a.getCurrentGraphData(),null!==this.graphData){if(this.graphData&&this.graphData.config&&(this.themeSettings.secondaryAxis=this.graphData.config.secondaryAxis||!1),this.chart_update?this.graphChart&&this.graphData&&(this.graphChart.graphData=this.graphData,this.graphChart.renderGraph(!0)):this.graphChart&&this.graphData&&(this.graphChart.graphData=this.graphData,this.graphChart.renderGraph(!1)),1===e&&this.chart_showstate){let t=this.graphData.data.datasets.map(function(t){return{name:t.label||"",min:t.minval,max:t.maxval,avg:null,sum:null,current:t.current,unit:t.unit||"",color:t.labelcolor||t.backgroundColor,timestamp:t.last_changed||""}});return t&&this.renderStateData(t),!0}}else console.error("No GraphData found for ",this.entityNames)}connectedCallback(){}disconnectedCallback(){}getCardSize(){return 4}}customElements.define("chart-card",ChartCard);