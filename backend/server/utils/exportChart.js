// for the conversion of chart to png

import puppeteer from 'puppeteer';

exports.exportChartAsImage = async (chartHtml) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(chartHtml, { waitUntil: 'networkidle0' });
  const chartBuffer = await page.screenshot({ type: 'png' });

  await browser.close();
  return chartBuffer;
};
