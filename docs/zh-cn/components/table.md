# Table

表格并非一个组件，它是一个样式文件，通过引入样式的方式来使用

```js
//使用构建工具（推荐）
import 'sober/styles/table.css'
```

直接在浏览器中引入。

```html
<!-- 直接在浏览器中引入-->
<link rel="stylesheet" href="https://unpkg.com/sober/styles/table.css">
```

它会为所有 `<table>` 元素添加样式和允许滚动。

```html preview
<table>
  <thead>
    <tr>
      <th>
        <s-checkbox indeterminate></s-checkbox>
      </th>
      <th>Project ID</th>
      <th>Project Name</th>
      <th>Category</th>
      <th>Description</th>
      <th>Owner</th>
      <th>Team</th>
      <th>Priority</th>
      <th>Status</th>
      <th>Progress</th>
      <th>Start Date</th>
      <th>Due Date</th>
      <th>Last Updated</th>
      <th>Budget</th>
      <th>Region</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><s-checkbox></s-checkbox></td>
      <td>PRJ-1001</td>
      <td>Nova Platform</td>
      <td>Product Design</td>
      <td>Unified workspace for digital product teams.</td>
      <td>Olivia Carter</td>
      <td>Northstar</td>
      <td>High</td>
      <td>In Progress</td>
      <td>72%</td>
      <td>Jan 15, 2025</td>
      <td>Jun 30, 2025</td>
      <td>May 12, 2025</td>
      <td>$84,000</td>
      <td>North America</td>
    </tr>
    <tr>
      <td><s-checkbox></s-checkbox></td>
      <td>PRJ-1002</td>
      <td>Atlas Gateway</td>
      <td>Cloud Services</td>
      <td>Secure access gateway for distributed systems.</td>
      <td>Daniel Brooks</td>
      <td>Cloudline</td>
      <td>Critical</td>
      <td>Active</td>
      <td>58%</td>
      <td>Feb 03, 2025</td>
      <td>Aug 18, 2025</td>
      <td>May 10, 2025</td>
      <td>$126,500</td>
      <td>Europe</td>
    </tr>
    <tr>
      <td><s-checkbox></s-checkbox></td>
      <td>PRJ-1003</td>
      <td>Echo Studio</td>
      <td>Content Production</td>
      <td>Creative production hub for media workflows.</td>
      <td>Emma Wilson</td>
      <td>Brightwave</td>
      <td>Medium</td>
      <td>Review Pending</td>
      <td>91%</td>
      <td>Mar 08, 2025</td>
      <td>May 28, 2025</td>
      <td>May 11, 2025</td>
      <td>$47,200</td>
      <td>Asia Pacific</td>
    </tr>
    <tr>
      <td><s-checkbox></s-checkbox></td>
      <td>PRJ-1004</td>
      <td>Orbit Analytics</td>
      <td>Data Intelligence</td>
      <td>Behavior analytics dashboard for business teams.</td>
      <td>Michael Turner</td>
      <td>Insight Lab</td>
      <td>High</td>
      <td>Completed</td>
      <td>100%</td>
      <td>Nov 11, 2024</td>
      <td>Apr 25, 2025</td>
      <td>Apr 25, 2025</td>
      <td>$92,800</td>
      <td>North America</td>
    </tr>
    <tr>
      <td><s-checkbox></s-checkbox></td>
      <td>PRJ-1005</td>
      <td>Vertex Console</td>
      <td>Developer Tools</td>
      <td>Operations console for engineering teams.</td>
      <td>Sophia Bennett</td>
      <td>Forge Unit</td>
      <td>High</td>
      <td>In Progress</td>
      <td>43%</td>
      <td>Apr 01, 2025</td>
      <td>Sep 12, 2025</td>
      <td>May 09, 2025</td>
      <td>$68,900</td>
      <td>Europe</td>
    </tr>
    <tr>
      <td><s-checkbox></s-checkbox></td>
      <td>PRJ-1006</td>
      <td>Pulse Network</td>
      <td>Infrastructure</td>
      <td>Monitoring network for real-time service health.</td>
      <td>James Morgan</td>
      <td>Core Systems</td>
      <td>Medium</td>
      <td>On Hold</td>
      <td>26%</td>
      <td>Jan 27, 2025</td>
      <td>Oct 05, 2025</td>
      <td>May 06, 2025</td>
      <td>$105,400</td>
      <td>South America</td>
    </tr>
    <tr>
      <td><s-checkbox></s-checkbox></td>
      <td>PRJ-1007</td>
      <td>Horizon Portal</td>
      <td>Customer Experience</td>
      <td>Self-service portal for customer account management.</td>
      <td>Grace Mitchell</td>
      <td>Client Success</td>
      <td>Low</td>
      <td>Active</td>
      <td>64%</td>
      <td>Feb 19, 2025</td>
      <td>Jul 22, 2025</td>
      <td>May 12, 2025</td>
      <td>$59,700</td>
      <td>Asia Pacific</td>
    </tr>
    <tr>
      <td><s-checkbox></s-checkbox></td>
      <td>PRJ-1008</td>
      <td>Prism Engine</td>
      <td>Artificial Intelligence</td>
      <td>Generative intelligence engine for workflow automation.</td>
      <td>Henry Cooper</td>
      <td>Vision Works</td>
      <td>Critical</td>
      <td>Planning</td>
      <td>14%</td>
      <td>May 05, 2025</td>
      <td>Dec 19, 2025</td>
      <td>May 12, 2025</td>
      <td>$154,300</td>
      <td>North America</td>
    </tr>
  </tbody>
</table>
```
