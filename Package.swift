// swift-tools-version:5.2

import PackageDescription

let package = Package(
    name: "JuIioCesarGithubIo",
    products: [
        .executable(
            name: "JuIioCesarGithubIo",
            targets: ["JuIioCesarGithubIo"]
        )
    ],
    dependencies: [
        .package(name: "Publish", url: "https://github.com/johnsundell/publish.git", from: "0.7.0")
    ],
    targets: [
        .target(
            name: "JuIioCesarGithubIo",
            dependencies: ["Publish"]
        )
    ]
)