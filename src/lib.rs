extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn get_complementary_color(red: u16, green: u16, blue: u16) -> Vec<u16> {
    let rgb = [red, green, blue];
    let min = rgb.iter().min().unwrap();
    let max = rgb.iter().max().unwrap();
    let total = min + max;

    vec![total - red, total - green, total - blue]
}
