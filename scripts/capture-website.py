"""Capture public Artify pages and verify the local editor without paid services."""
import os
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs' / 'screenshots'
BASE = os.environ.get('ARTIFY_PREVIEW_URL', 'http://127.0.0.1:3010')
CHROME = os.environ.get('ARTIFY_CHROME_PATH', r'C:\Program Files\Google\Chrome\Application\chrome.exe')
OUT.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=CHROME, headless=True)
    context = browser.new_context(viewport={'width': 1440, 'height': 1100}, device_scale_factor=1)
    page = context.new_page()
    page.goto(BASE + '/landingPage')
    page.wait_for_load_state('networkidle')
    expect(page.get_by_role('heading', name='Make images. Break the ordinary.')).to_be_visible()
    page.screenshot(path=str(OUT / 'landing-desktop.png'), full_page=True)
    page.goto(BASE + '/studio')
    page.wait_for_load_state('networkidle')
    expect(page.locator('aside').get_by_role('link', name='Home', exact=True)).to_have_count(0)
    page.get_by_label('Open image', exact=True).set_input_files(str(ROOT / 'public/assets/images/showcase-1.png'))
    expect(page.locator('canvas')).to_be_visible()
    page.get_by_label('Text overlay', exact=True).fill('Made in Artify')
    page.get_by_label('Export format').select_option('image/webp')
    with page.expect_download() as download_info:
        page.get_by_role('button', name='Export image', exact=True).click()
    assert download_info.value.suggested_filename.endswith('.webp')
    assert Path(download_info.value.path()).stat().st_size > 0
    page.screenshot(path=str(OUT / 'editor-desktop.png'), full_page=True)
    mobile = context.new_page()
    mobile.set_viewport_size({'width': 390, 'height': 844})
    mobile.goto(BASE + '/landingPage')
    mobile.wait_for_load_state('networkidle')
    assert mobile.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
    mobile.screenshot(path=str(OUT / 'landing-mobile.png'), full_page=True)
    mobile.goto(BASE + '/studio')
    mobile.wait_for_load_state('networkidle')
    mobile.get_by_role('button', name='Open navigation', exact=True).click()
    expect(mobile.locator('.mobile-menu')).to_be_visible()
    expect(mobile.locator('.mobile-menu').get_by_role('link', name='Home', exact=True)).to_have_count(0)
    mobile.screenshot(path=str(OUT / 'editor-mobile.png'), full_page=True)
    browser.close()
print('Passed: public pages, editor upload, text overlay, WebP download, desktop/mobile navigation, and mobile landing width. Screenshots saved in docs/screenshots.')
