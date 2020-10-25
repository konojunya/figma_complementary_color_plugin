mod lib;

fn main() {
    let rgb = lib::get_complementary_color(100, 150, 200);
    println!("{:?}", rgb);
}
