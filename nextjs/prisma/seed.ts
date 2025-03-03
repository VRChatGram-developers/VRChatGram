import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Usersデータの挿入
  const users = await prisma.users.createMany({
    data: [
      {
        name: "山田 太郎",
        email: "taro.yamada@example.com",
        gender: "male",
        birthday: new Date("1995-06-15"),
        my_id: "TARO1995",
        uid: "1",
        show_sensitive_type: "default",
        is_admin: false,
        status: "active",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "佐藤 花子",
        email: "hanako.sato@example.com",
        gender: "male",
        birthday: new Date("1990-03-12"),
        my_id: "ICHIRO90",
        uid: "xaOEZCqzMEgJmrpnEfUaDuCWUk92",
        show_sensitive_type: "default",
        is_admin: false,
        status: "active",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "鈴木 健一",
        email: "kenichi.suzuki@example.com",
        gender: "female",
        birthday: new Date("1985-09-25"),
        my_id: "REIKO85",
        uid: "RyNWk6zouUgPYgi3onQoHztO5pW2",
        show_sensitive_type: "default",
        is_admin: false,
        status: "active",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "高橋 美咲",
        email: "misaki.takahashi@example.com",
        gender: "female",
        birthday: new Date("1993-05-17"),
        my_id: "MISAKI93",
        uid: "v7QJ24wzPxYlOdFTcDgEI7w8XG32",
        show_sensitive_type: "default",
        is_admin: false,
        status: "active",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "田中 直樹",
        email: "naoki.tanaka@example.com",
        gender: "male",
        birthday: new Date("1994-02-28"),
        my_id: "NAOKI94",
        uid: "NmQZddRgHBetU2T6RW1xzZkXxkA3",
        show_sensitive_type: "default",
        is_admin: false,
        status: "active",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "伊藤 玲奈",
        email: "rena.ito@example.com",
        gender: "male",
        birthday: new Date("1992-10-10"),
        my_id: "YOSUKE92",
        uid: "xAJxcn61mOczYQd8WEiPYlY2ywI2",
        show_sensitive_type: "default",
        is_admin: false,
        status: "active",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "渡辺 大輝",
        email: "daiki.watanabe@example.com",
        gender: "male",
        birthday: new Date("2000-06-22"),
        my_id: "DAIKI2000",
        uid: "9",
        show_sensitive_type: "default",
        is_admin: false,
        status: "active",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "中村 陽子",
        email: "yoko.nakamura@example.com",
        gender: "male",
        birthday: new Date("1989-11-05"),
        my_id: "TOMOKI89",
        uid: "10",
        show_sensitive_type: "default",
        is_admin: false,
        status: "active",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "小林 翔",
        email: "sho.kobayashi@example.com",
        gender: "female",
        birthday: new Date("1995-04-30"),
        my_id: "SHO95",
        uid: "BIdX2oKGMhdune4ktEd5g8GUcbl1",
        show_sensitive_type: "default",
        is_admin: false,
        status: "active",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "松本 さくら",
        email: "sakura.matsumoto@example.com",
        gender: "female",
        birthday: new Date("1995-04-30"),
        my_id: "YUMI95",
        uid: "aEE3IkGjhoSn7bhB1CHbou9j38f1",
        show_sensitive_type: "default",
        is_admin: false,
        status: "active",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
  });

  // Tagsデータの挿入
  const tags = await prisma.tags.createMany({
    data: [
      { name: "組み合わせコーデ", created_at: new Date(), updated_at: new Date() },
      { name: "Marycia3D", created_at: new Date(), updated_at: new Date() },
      { name: "森羅", created_at: new Date(), updated_at: new Date() },
      { name: "kaihenコーデコンテスト", created_at: new Date(), updated_at: new Date() },
      { name: "Milltina", created_at: new Date(), updated_at: new Date() },
      { name: "Lapwing", created_at: new Date(), updated_at: new Date() },
      { name: "リアルクローズ", created_at: new Date(), updated_at: new Date() },
      { name: "EXTENSIONCLOTHING", created_at: new Date(), updated_at: new Date() },
      { name: "マヌカ", created_at: new Date(), updated_at: new Date() },
      { name: "kaihen始めました", created_at: new Date(), updated_at: new Date() },
      { name: "Grus", created_at: new Date(), updated_at: new Date() },
      { name: "kaihenルックブック", created_at: new Date(), updated_at: new Date() },
      { name: "桔梗", created_at: new Date(), updated_at: new Date() },
      { name: "PR", created_at: new Date(), updated_at: new Date() },
      { name: "スカジャンkaihen", created_at: new Date(), updated_at: new Date() },
      { name: "龍のヨルちゃん", created_at: new Date(), updated_at: new Date() },
      { name: "秋コーデ", created_at: new Date(), updated_at: new Date() },
      { name: "萌", created_at: new Date(), updated_at: new Date() },
      { name: "冬コーデ", created_at: new Date(), updated_at: new Date() },
      { name: "Natelier", created_at: new Date(), updated_at: new Date() },
    ],
  });

  const usersData = await prisma.users.findMany();

  // Postsデータの挿入
  const posts = await prisma.posts.createMany({
    data: [
      {
        user_id: usersData[0].id,
        title: "夕暮れの街角",
        view_count: 0,
        description: "オレンジ色の空が広がる街角。ノスタルジックな気持ちになる一枚。",
        show_sensitive_type: "all",
        is_publish: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: usersData[1].id,
        title: "森の静寂",
        view_count: 0,
        description: "朝露が輝く森の奥。鳥のさえずりが響く癒しの空間を切り取った。",
        show_sensitive_type: "all",
        is_publish: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: usersData[2].id,
        title: "雨上がりの路地",
        view_count: 0,
        description: "濡れた石畳に映る街灯の光。幻想的な雰囲気の中で歩くひととき。",
        show_sensitive_type: "all",
        is_publish: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: usersData[3].id,
        title: "星降る夜",
        view_count: 0,
        description: "澄んだ夜空に広がる無数の星。まるで宇宙に吸い込まれそうな風景。",
        show_sensitive_type: "all",
        is_publish: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: usersData[4].id,
        title: "波打ち際の足跡",
        view_count: 0,
        description: "静かに打ち寄せる波と消えゆく足跡。思い出が詰まった夏の記憶。",
        show_sensitive_type: "all",
        is_publish: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: usersData[5].id,
        title: "ネオンの誘惑",
        view_count: 0,
        description: "都会の喧騒の中、輝くネオンが映し出す別世界のような夜の景色。",
        show_sensitive_type: "all",
        is_publish: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: usersData[6].id,
        title: "紅葉のトンネル",
        view_count: 0,
        description: "真っ赤な紅葉が生み出す自然のトンネル。秋の訪れを感じる風景。",
        show_sensitive_type: "all",
        is_publish: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: usersData[7].id,
        title: "古びたカフェ",
        view_count: 0,
        description: "木の温もりを感じるカフェ。レトロな雰囲気が心を落ち着かせる。",
        show_sensitive_type: "all",
        is_publish: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: usersData[8].id,
        title: "線路沿いの桜",
        view_count: 0,
        description: "満開の桜並木と走り抜ける列車。春の訪れを象徴する美しい瞬間。",
        show_sensitive_type: "all",
        is_publish: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: usersData[9].id,
        title: "光差す森",
        view_count: 0,
        description: "木々の隙間から差し込む朝日。生命の息吹を感じる幻想的な一枚。",
        show_sensitive_type: "all",
        is_publish: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
  });

  const postsData = await prisma.posts.findMany();

  const postImages = await prisma.post_images.createMany({
    data: [
      {
        post_id: postsData[0].id,
        url: "https://vrcss-development.s3.ap-southeast-2.amazonaws.com/GhuNddiboAEbt0B.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
        width: 320,
        height: 320,
      },
      {
        post_id: postsData[1].id,
        url: "https://vrcss-development.s3.ap-southeast-2.amazonaws.com/GhY73FvaUAAG2Zl.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
        width: 320,
        height: 320,
      },
      {
        post_id: postsData[2].id,
        url: "https://vrcss-development.s3.ap-southeast-2.amazonaws.com/GhuNnquboAAHFCS.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
        width: 320,
        height: 320,
      },
      {
        post_id: postsData[3].id,
        url: "https://vrcss-development.s3.ap-southeast-2.amazonaws.com/GhuN-8ObcAAs3Ed.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
        width: 320,
        height: 320,
      },
      {
        post_id: postsData[4].id,
        url: "https://vrcss-development.s3.ap-southeast-2.amazonaws.com/GhOWeJ0bQAA5Mz5.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
        width: 320,
        height: 320,
      },
      {
        post_id: postsData[5].id,
        url: "https://vrcss-development.s3.ap-southeast-2.amazonaws.com/GhgVCvDaQAAU7vL.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
        width: 320,
        height: 320,
      },

      {
        post_id: postsData[6].id,
        url: "https://vrcss-development.s3.ap-southeast-2.amazonaws.com/GheVwwYacAEo9Qi.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
        width: 320,
        height: 320,
      },

      {
        post_id: postsData[7].id,
        url: "https://vrcss-development.s3.ap-southeast-2.amazonaws.com/GgcedtnboAACljq.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
        width: 320,
        height: 320,
      },

      {
        post_id: postsData[8].id,
        url: "https://vrcss-development.s3.ap-southeast-2.amazonaws.com/Gh4VrddaoAADyLJ.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
        width: 320,
        height: 320,
      },

      {
        post_id: postsData[9].id,
        url: "https://vrcss-development.s3.ap-southeast-2.amazonaws.com/GgcedtnboAACljq.jpeg",
        created_at: new Date(),
        updated_at: new Date(),
        width: 320,
        height: 320,
      },
    ],
  });

  const tagsData = await prisma.tags.findMany();

  // post_tagsのシードデータ挿入
  const postTags = await prisma.post_tags.createMany({
    data: [
      // 投稿とタグを組み合わせて挿入
      {
        post_id: postsData[0].id, // 例: '夕暮れの街角'
        tag_id: tagsData[0].id, // 例: '組み合わせコーデ'
      },
      {
        post_id: postsData[1].id, // '森の静寂'
        tag_id: tagsData[1].id, // 'Marycia3D'
      },
      {
        post_id: postsData[2].id, // '雨上がりの路地'
        tag_id: tagsData[2].id, // '森羅'
      },
      {
        post_id: postsData[3].id, // '星降る夜'
        tag_id: tagsData[3].id, // 'kaihenコーデコンテスト'
      },
      {
        post_id: postsData[4].id, // '波打ち際の足跡'
        tag_id: tagsData[4].id, // 'Milltina'
      },
      {
        post_id: postsData[5].id, // 'ネオンの誘惑'
        tag_id: tagsData[5].id, // 'Lapwing'
      },
      {
        post_id: postsData[6].id, // '紅葉のトンネル'
        tag_id: tagsData[6].id, // 'リアルクローズ'
      },
      {
        post_id: postsData[7].id, // '古びたカフェ'
        tag_id: tagsData[7].id, // 'EXTENSIONCLOTHING'
      },
      {
        post_id: postsData[8].id, // '線路沿いの桜'
        tag_id: tagsData[8].id, // 'マヌカ'
      },
      {
        post_id: postsData[9].id, // '光差す森'
        tag_id: tagsData[9].id, // 'kaihen始めました'
      },
      // 必要に応じて追加の組み合わせを追加
    ],
  });

  const socialLinks = await prisma.social_links.createMany({
    data: [
      {
        user_id: usersData[0].id,
        platform_types: "x",
        platform_url: "https://x.com/elonmusk",
      },
      {
        user_id: usersData[0].id,
        platform_types: "vrchat",
        platform_url: "https://vrchat.com/home/user/usr_90b864ab-ea81-4071-80f8-9b4f544f4a10",
      },
      {
        user_id: usersData[0].id,
        platform_types: "other",
        platform_url: "https://www.google.com",
      },
      {
        user_id: usersData[1].id,
        platform_types: "x",
        platform_url: "https://x.com/elonmusk",
      },
      {
        user_id: usersData[1].id,
        platform_types: "vrchat",
        platform_url: "https://vrchat.com/home/user/usr_90b864ab-ea81-4071-80f8-9b4f544f4a10",
      },
      {
        user_id: usersData[1].id,
        platform_types: "other",
        platform_url: "https://www.google.com",
      },
      {
        user_id: usersData[2].id,
        platform_types: "x",
        platform_url: "https://x.com/elonmusk",
      },
      {
        user_id: usersData[2].id,
        platform_types: "vrchat",
        platform_url: "https://vrchat.com/home/user/usr_90b864ab-ea81-4071-80f8-9b4f544f4a10",
      },
      {
        user_id: usersData[2].id,
        platform_types: "other",
        platform_url: "https://www.google.com",
      },
      {
        user_id: usersData[3].id,
        platform_types: "x",
        platform_url: "https://x.com/elonmusk",
      },
      {
        user_id: usersData[3].id,
        platform_types: "vrchat",
        platform_url: "https://vrchat.com/home/user/usr_90b864ab-ea81-4071-80f8-9b4f544f4a10",
      },
      {
        user_id: usersData[3].id,
        platform_types: "other",
        platform_url: "https://www.google.com",
      },
      {
        user_id: usersData[4].id,
        platform_types: "x",
        platform_url: "https://x.com/elonmusk",
      },
      {
        user_id: usersData[4].id,
        platform_types: "vrchat",
        platform_url: "https://vrchat.com/home/user/usr_90b864ab-ea81-4071-80f8-9b4f544f4a10",
      },
      {
        user_id: usersData[4].id,
        platform_types: "other",
        platform_url: "https://www.google.com",
      },
      {
        user_id: usersData[5].id,
        platform_types: "x",
        platform_url: "https://x.com/elonmusk",
      },
      {
        user_id: usersData[5].id,
        platform_types: "vrchat",
        platform_url: "https://vrchat.com/home/user/usr_90b864ab-ea81-4071-80f8-9b4f544f4a10",
      },
      {
        user_id: usersData[5].id,
        platform_types: "other",
        platform_url: "https://www.google.com",
      },
      {
        user_id: usersData[6].id,
        platform_types: "x",
        platform_url: "https://x.com/elonmusk",
      },
      {
        user_id: usersData[6].id,
        platform_types: "vrchat",
        platform_url: "https://vrchat.com/home/user/usr_90b864ab-ea81-4071-80f8-9b4f544f4a10",
      },
      {
        user_id: usersData[6].id,
        platform_types: "other",
        platform_url: "https://www.google.com",
      },
      {
        user_id: usersData[7].id,
        platform_types: "x",
        platform_url: "https://x.com/elonmusk",
      },
      {
        user_id: usersData[7].id,
        platform_types: "vrchat",
        platform_url: "https://vrchat.com/home/user/usr_90b864ab-ea81-4071-80f8-9b4f544f4a10",
      },
      {
        user_id: usersData[7].id,
        platform_types: "other",
        platform_url: "https://www.google.com",
      },
      {
        user_id: usersData[8].id,
        platform_types: "x",
        platform_url: "https://x.com/elonmusk",
      },
      {
        user_id: usersData[8].id,
        platform_types: "vrchat",
        platform_url: "https://vrchat.com/home/user/usr_90b864ab-ea81-4071-80f8-9b4f544f4a10",
      },
      {
        user_id: usersData[8].id,
        platform_types: "other",
        platform_url: "https://www.google.com",
      },
      {
        user_id: usersData[9].id,
        platform_types: "x",
        platform_url: "https://x.com/elonmusk",
      },
      {
        user_id: usersData[9].id,
        platform_types: "vrchat",
        platform_url: "https://vrchat.com/home/user/usr_90b864ab-ea81-4071-80f8-9b4f544f4a10",
      },
      {
        user_id: usersData[9].id,
        platform_types: "other",
        platform_url: "https://www.google.com",
      },
    ],
  });

  const boothItems = await prisma.booth_items.createMany({
    data: [
      {
        image:
          "https://booth.pximg.net/ed52788c-0b3b-4e38-9ded-1e5797daf0ef/i/6106863/07bd77df-a8ee-4244-8c4e-16cf7cb584bb_base_resized.jpg",
        title: "オリジナル3Dモデル「しなの」",
        detail: "必ず下記の商品説明と利用規約をお読み下さい",
        url: "https://ponderogen.booth.pm/items/6106863",
      },
      {
        image:
          "https://booth.pximg.net/f5d1aad1-8436-4e4e-8ebe-fa00ed8bab73/i/4590436/4baab8cf-370f-4c0d-9ea2-e725581a3424_base_resized.jpg",
        title: "Urban Tech Obsidian",
        detail:
          "Urban Tech Obsidianはクラシックなスタイルに未来志向的な感じを加えた衣装です。\n\n本衣装はModular Avatar、あるいは黒鳥ケモノ工房さんのAvatarTools(v2.2.2 BETA以上)を使って衣装をアバターに着せることを前提に作られています。\n\n同梱ファイル:\n衣装FBXファイル、ColorTexutres、PSD(Photoshop Files)、Materials、Prefab\n\n以下の導入手順に従わない場合や、他のアバターに導入する際に発生する問題についてのお問い合わせは受け付けておりません！\n導入中に問題が発生した場合は、以下の導入手順とアバターの最小必要バージョンも必ずご確認ください！\nWe do not accept inquiries about problems that occur when not following the installation instructions below or when installing to other avatars!\nIf you experience problems during installation, please be sure to also check the installation instructions below and the minimum required version of your avatar!\n아래의 도입절차를 따르지 않거나, 다른 아바타에 도입하는 중 발생하는 문제에 대한 문의는 받지 않습니다!\n도입 도중 문제가 발생 시, 아래의 도입절차와 아바타의 최소 요구 버전도 꼭 확인하시기 바랍니다!",
        url: "https://booth.pm/ja/items/4590436",
      },
      {
        image:
          "https://booth.pximg.net/87b70515-e32e-4a2e-bf41-317cf2c2177c/i/5485641/0cfec889-4f2c-4983-9b80-ffb359c6eb0d_base_resized.jpg",
        title: "2024年第1弾『断罪セーラー』Danzai Sailor 💜",
        detail:
          '\nEXTENSION CLOTHING 2024年最初の作品はセクシーキュートなメンヘラハーネスセーラー『断罪セーラー』です！！！\n\n2024年もEXTENSION CLOTHINGをよろしくお願いいたします💜\n\n――――――――――――――――――――――――――\n\n※フルパックはアバターが追加された際に無料で追加分をダウンロードできます。\n※The full pack allows you to download additional avatars for free when they are added.\n\n――――――――――――――――――――――――――\n\n\n【Supports "9" avatars】\n■『ミルティナ』 - Miltina　\nhttps://dolosart.booth.pm/items/6538026\n\n※FC版は未対応\n胸のシェイプキーはWearのみで制作しています。\n\n■『しなの』 - Shinano　\nhttps://ponderogen.booth.pm/items/6106863\n■『愛莉』 - Airi\nhttps://booth.pm/ja/items/6082686\n■『森羅』 - Shinra　\nhttps://mio3works.booth.pm/items/4707634\n■『マヌカ』 - Manuka\nhttps://booth.pm/ja/items/5058077\n■『萌』 - Moe　\nhttps://kyubihome.booth.pm/items/4667400\n■『桔梗』 - Kikyo　\nhttps://ponderogen.booth.pm/items/3681787\n■『セレスティア』 - Selestia　\nhttps://jingo1016.booth.pm/items/4035411\n■『シフォン』 - Chiffon\nhttps://booth.pm/ja/items/5354471\n■『瑞希』 - Mizuki\nhttps://paryi.booth.pm/items/5132797\n\n\n【Package contents】\n- Unity Package\n- PSD\n\n\n――――――――――――――――――――――――――\n\n\n【Mesh content】\n●Material - A \nSailor Center Parts (Breast Shape Support)\nSailor Ribbon (Breast Shape Support)\nSailor Tops (Breast Shape Support)(Short Shape)\nSailor Skirt (Skirt Short Shape)\n\n"Important notes"\nWe have imposed restrictions on shape keys and physics bones in the design of costumes for small chest sizes. Please be aware of this in advance.\n\n小さい胸には衣装のデザイン上シェイプキーおよびフィジックスボーンの制限を設けていますあらかじめご了承ください。\n\n●Material - B\nBody Harness\nFetters\nLead\nBack Lead\nShackles\nUpper Leg Belt\n\n●Material - C\nKnee High Socks (Use Heel Shape Key)\nLoafers (Use Heel Shape Key)\nSocks (Use Heel Shape Key)\nUnder Wear\n\n●Material - G\nGantai Left (EyePatch)\nGantai Right (EyePatch)\n\n●Material - H\nBandage\n\n●Other Materials\nEarrings Left\nEarrings Right\nNavel Piercing\n\n――――――――――――――――――――――――――\n\n\n【禁止事項】\n●未購入者へのデータの送信、データの共有を禁止します。\n●違法アップロードサイトへのアップロードおよび販売サイトでの当ショップのデータの販売を禁止します。\n●販売データのモデルの一部、またはすべてを使用したモデルの販売を禁止します。TEXも同様。\n●当ショップの衣装を着用させたアバターのパブリック化を禁止します。自ワールドへの衣装の配置は再利用できない状態にするなど配慮いただけると嬉しいです。\n\n\n【Prohibited Activities】\n\nSending or sharing data with non-purchasers is strictly prohibited.\nUploading data to illegal upload sites and selling our shop\'s data on sales platforms is prohibited.\nSelling models that use parts or the entirety of the sold data is prohibited, including TEX.\nPublicizing avatars wearing costumes from our shop is prohibited. When placing costumes in your world, please ensure they cannot be reused. We appreciate your consideration in this matter.\n\n――――――――――――――――――――――――――\n\n\n\n【対応シェーダー】\nliltoon Shader\nhttps://booth.pm/ja/items/3087170\n\n\n――――――――――――――――――――――――――\n\n【注意事項】\n\n前提としてVCCでセットアップしています。\nVCCへの移行をお願いいたします。\n\nUnity 2019.4.31f1 で製作およびセットアップをしています。\n\nデータのダウンロードの際にマテリアルやテクスチャを一括でパッケージングしたマテリアルパックも同時にダウンロードしてください。\n\n\n【Important Notes】\n\nIt is assumed that the setup is done with VCC.\nPlease transition to VCC for the setup.\n\nWe are developing and setting up using Unity 2019.4.31f1.\n\nWhen downloading data, please make sure to download a material pack that packages materials and textures collectively.\n\n\n――――――――――――――――――――――――――\n\n\n【利用規約】\n\nVN3ライセンス（https://www.vn3.org/）を採用させていただいています。規約の全文は次のページでご覧いただけます。\n\n※配信での利用に関して\n\n企業様は別途DMにてご相談させてください。\n個人様であればDMに配信リンクを送っていただければ配信での使用は可能です。グッズ製作など商業目的の場合や配信などの収益に関わる場合も個人様であれば先ほどの条件で使用可能です。また改変時などによるデータの共用は禁止しております。Vtuber様の素体改変時に外部へ改変委託する際は２着購入していただく必要があります。一度購入して頂いた同一の個人様であれば他のチャンネルでの使用は許可します。\n\n\n【Terms of Use】\n\nWe adopt the VN3 License (https://www.vn3.org/) for our content. The full terms can be found on the following page.\n\n※ Regarding Usage in Streams\n\nFor companies, please consult with us separately via DM.\nFor individuals, you are allowed to use our content in your streams if you send the streaming link via DM. This includes commercial purposes such as creating merchandise or generating revenue through streams. However, sharing or altering the data is prohibited. In the case of commissioning external modifications for Vtuber avatar bases, you must purchase two sets. Once purchased, the same individual is permitted to use the content on different channels.\n\n\nhttps://drive.google.com/drive/folders/1xGU272rLuk_WkiJG6QnkL0pP02pF5j2M?usp=sharing\n\n※その他の問い合わせなどはDMにてお願いします。 For other inquiries, please use DM.\n\n\n――――――――――――――――――――――――――\n\n\n【更新履歴】\nMoe版 \n●Psychs Boneの設定の修正 V1.0.1\n\nシフォン版\n● Knee High Socksの形状の変更 V1.0.1\n\n森羅版\n●トップスの形状変更、ハーネスおよびへそピアスののデザイン変更　V1.0.1\n●デフォルト下着の併用専用シェイプキーの修正 V1.0.2',
        url: "https://booth.pm/ja/items/5485641",
      },
      {
        image:
          "https://booth.pximg.net/9cef401b-c87a-471e-a3b0-fbc62975d452/i/6447797/9eb9b88f-bfd7-4fa1-a916-4d288f189aff_base_resized.jpg",
        title: "[16Avatars]𝑵𝒐𝒊𝒓_𝑳𝒖𝒙𝒆",
        detail:
          '[14Avatars]𝑵𝒐𝒊𝒓_𝑳𝒖𝒙𝒆\n\n~セール中\n🎀2025. 2. 26.~ 3.5 一週間セール🎀\n▶ Full Pack 4000円 -\u003e 3200円\n▶ Single 2000円 -\u003e 1600円\n\n\n⭒❃.✮:▹Support Avatar "16" avatars\n\n\n💝『しなの』 - Shinano　\nhttps://ponderogen.booth.pm/items/6106863\n💝『ミルティナ』 - Milltina\nhttps://booth.pm/ko/items/6538026\n💝『愛莉』 - Airi\nhttps://booth.pm/ja/items/6082686\n💝『萌』 - Moe　\nhttps://kyubihome.booth.pm/items/4667400\n💝『森羅』 - Shinra　\nhttps://mio3works.booth.pm/items/4707634\n💝『マヌカ』 - Manuka\nhttps://booth.pm/ja/items/5058077\n💝『桔梗』 - Kikyo　\nhttps://ponderogen.booth.pm/items/3681787\n💝『セレスティア』 - Selestia　\nhttps://jingo1016.booth.pm/items/4035411\n💝『しお』 - Sio　\nhttps://chocolaterice.booth.pm/items/5650156\n💝『シフォン』 - Chiffon\nhttps://komado.booth.pm/items/5354471\n💝『ライム』 - Lime\nhttps://komado.booth.pm/items/4876459\n💝『瑞希』 - Mizuki\nhttps://paryi.booth.pm/items/5132797\n💝『ルルネ』 - Rurune\nhttps://paryi.booth.pm/items/5957830\n💝『水瀬』 - Minase\nhttps://mio3works.booth.pm/items/4013951\n💝『狛乃』 - Komano\nhttps://booth.pm/ko/items/5260363\n\n\n【ShapeKey】\n\n- Shinano : Breasts_Big, Hip_Big, Corest\n- Milltina : (No bra)Breasts_Cow, For_Small\n("It cannot be reduced from the basis to small. I have created a separate small fit.")\n- Airi : Breast Big ,Breast Small, Waist_Corset\n- Moe : Big Breast , Small Breast, Corest\n- Manuka : Breast Big ,Breast Big Plus, Waist_Corset\n- Shinra : Breast Big ,Breast Small\n- Kikyo : Breast Big ,Breast Small\n- Selestia : Breast Big ,Breast Small, Waist_Corset\n- Sio : Breast Big ,Breast Small\n- Chiffon : Breasts_big, Breasts_small, Waist_slim\n- Lime : Breasts_big, Breasts_small, Waist_slim\n- Rurune : Breast_big(limit), Breast_small_____胸_小, Waist_thin_____腰_細く\n- Mizuki : Breast_big(50), Breast_small_____胸_小, Waist_thin_____腰_細く\n\n\n\n\n\n【Download】\n- Unity Package\n- MaterialPack\n- PSD\n\n\n⭒❃.✮:▹使用時の注意事項\n\nフラットシェイプキーには対応していません。\nスモールシェイプキーも物理ボーンをオフにしてご使用ください。\nその他、本体が見えない場合は、シェイプキーの使用をお勧めします。\n\nUnity、vccの最新バージョンをご使用ください\nそれ以外のバージョンでの動作は保証できません。\nVRC以外のゲームでの動作は保証できません。\n\nlilToonの最新バージョンをご使用ください！RimShade効果が含まれています。\n\n\n⭒❃.✮:▹禁止事項\n\n1.VRChatに公開状態でアップロードする行為。\n2.購入者以外の人にファイルを共有する行為。\n3.販売ファイル、または改変ファイルを再販する行為。\n4.コミッションまたは依頼者双方が購入せずにアップロードする行為。\n5.モデルの一部を切り離して販売する行為\n6.政治、宗教、人種、他者への誹謗中傷目的での使用禁止。\n\n\n-本モデルのコミッション時、依頼者側と作業者側ともにモデルデータの購入履歴がある場合、許可します。\n\n- 法人や会社での使用は、商業的、非商業的活動ともに使用前にご連絡ください。\n\n⭒❃.✮:▹著作権について\n\n- このモデルのデータを修正・変形して個人的な用途に使用することができますが、修正の有無にかかわらず、このモデルに付属するすべてのデータの著作権は作成者に帰属します。\n\n\n⭒❃.✮:▹Cautions for use\n\nFlat shape keys are not supported.\nSmall Shape Keys should also be used with Physics Bones turned off.\nWe recommend using Shape Keys for parts of the body that are not visible.\n\n\nPlease use the latest versions of Unity and vcc.\nOperation with other versions is not guaranteed.\nWe cannot guarantee that the game will work with games other than VRC.\n\nPlease use the latest version of LilToon! RimShade effect included.\n\n\n⭒❃.✮:▹Prohibitions\n\n1. uploading to VRChat in a public state.\n2. sharing files with anyone other than the buyer.\n3. reselling sold or altered files.\n4. uploading a commission or client without both parties purchasing it.\n5. selling parts of a model separately.\n6. no use for political, religious, racial, or other disparaging purposes.\n\n\n-We allow this if both the client and the worker have a history of purchasing model data at the time of the model commission.\n\n- For use by corporations or companies, both commercial and non-commercial activities, please contact us before use.\n\n\n⭒❃.✮:▹Copyright\n\n- You may modify and adapt the data in this model for your own personal use, but all data accompanying this model, whether modified or not, is copyrighted by its creator.',
        url: "https://booth.pm/ja/items/6447797",
      },
      {
        image:
          "https://booth.pximg.net/5b6f1a07-833e-4d67-818f-e32612e474ca/i/5208259/592edd14-77ac-4c86-84eb-498ba941b5fc_base_resized.jpg",
        title: "ラブリーローツインテールヘア",
        detail: "2023.10.28\nLovely Low Twintail hair\nラブリーローツインテールヘア",
        url: "https://booth.pm/ja/items/5208259",
      },
      {
        image:
          "https://booth.pximg.net/4e04a5b6-2b0f-4eb3-87b6-6d8b6b8e315b/i/5823103/ac6abf3f-3be2-429f-9603-5808dc2f77d5_base_resized.jpg",
        title: "Neko bob",
        detail: "",
        url: "https://booth.pm/ja/items/5823103",
      },
      {
        image:
          "https://booth.pximg.net/87b70515-e32e-4a2e-bf41-317cf2c2177c/i/5053741/839285e6-e797-4eee-8e9d-926bb12d7ff5_base_resized.jpg",
        title: "HYPER TECH EVO -IGNITE-",
        detail:
          "HYPER TECH EVO -IGNITE-\n\nEXTENSION CLOTHING HYPER TECHシリーズが HYPER TECH EVOとなって帰ってきました。今回の衣装はジェットパックや武器、機械の足を装備した戦う女の子をイメージしています。ギミックを導入することを前提に可動部などを計算してデザインしています。\n\n大人な雰囲気のアバターはセクシーな雰囲気に。かわいい系統のアバターは武器や機械のミスマッチ感が程よく演出されています。\n\n実際に射撃できる武器や稼働する機会の足はVRCでの新しい改変や体験を感じることができると思います！！",
        url: "https://booth.pm/ja/items/5053741",
      },
      {
        image:
          "https://booth.pximg.net/87b70515-e32e-4a2e-bf41-317cf2c2177c/i/5760880/efe387c1-a4fc-4046-8466-7f7257c0ee64_base_resized.jpg",
        title: "2024年第4弾『断罪チャイナ- 罪と罰-』Danzai China Dress",
        detail:
          '2024年第4弾『断罪チャイナ- 罪と罰-』Danzai China Dress\n\n初の記念すべきチャイナドレスは扇子ギミック搭載の高品質デザインチャイナドレス！！！豪華絢爛なイメージのあるチャイナドレスをバーチャルならではのデザインを施してEXTENSION CLOTHINGから登場！！！\n\n※ギミックの使用にはモジュラーアバターのインストールが必要です。\nhttps://modular-avatar.nadena.dev/ja/\n\n\n\n※フルパックはアバターが追加された際に無料で追加分をダウンロードできるパックです。\n\n∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽\n\n\n\n"Danzai China Dress - Sin and Punishment"\n\nThe inaugural commemorative China dress features a high-quality design with a fan gimmick! Adorned with the luxurious and resplendent imagery of the traditional Chinese dress, this virtual rendition is brought to you by EXTENSION CLOTHING, showcasing designs unique to the virtual realm!\n\n*Please note: Installation of modular avatars is required to utilize the gimmick.\n\nhttps://modular-avatar.nadena.dev/en/\n\n\n※The full pack allows you to download additional avatars for free when they are added.\n\n∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽',
        url: "https://booth.pm/ja/items/5760880",
      },
      {
        image:
          "https://booth.pximg.net/4a8b2e27-d374-4781-866c-9257a10bf56d/i/5359699/965389cd-296e-46ff-bcdd-24d20ef5ce77_base_resized.jpg",
        title: "【12アバター対応】ナイト・イン・ヨシワラ【MA対応】",
        detail:
          "年末なので豪華な物をお届けしたいと思い、現実をも犠牲にして作り上げた衣装です。メリークリスマス...\n\n森羅ちゃん用のインナーにはジッパーが付属しておりません\n\n・適用にはAvatarToolsかModuleAvatarを推奨します(使わないと胸の部分がはみ出るかもしれません)\nhttps://booth.pm/ja/items/1564788\n・衣装のパッケージをインポートする前に必ず本体となるアバターを先にインポートしてください。\n・ミルティナちゃん用は1.01.1を想定して対応されています。それ以前のバージョンはサポートしておりません。\n\n・ミルティナちゃん本体はこちらです\nhttps://booth.pm/ja/items/6538026\n・しなのちゃん本体はこちらです\nhttps://booth.pm/ja/items/6106863\n・愛莉ちゃん本体はこちらです\nhttps://booth.pm/ja/items/6082686\n・瑞希ちゃん本体はこちらです\nhttps://paryi.booth.pm/items/5132797\n・ルルネちゃん本体はこちらです\nhttps://paryi.booth.pm/items/5957830\n・マヌカちゃん本体はこちらです\nhttps://booth.pm/ja/items/5058077\n・萌ちゃん本体はこちらです\nhttps://kyubihome.booth.pm/items/4667400\n・セレスティアちゃん本体はこちらです\nhttps://booth.pm/ja/items/4035411\n・桔梗ちゃん本体はこちらです\nhttps://booth.pm/ja/items/3681787\n\nもしこの衣装だけを使いたい場合、着せ替え済みのPrefabも用意して置きましたので、そちらもご利用ください。\n\nご使用の際は、商品紹介画像のシェイプキーの設定に合わせてお使いください。そして、購入前に必ず最後の商品画像にある注意点をお読みください。\n\n----------------------------------------\n*SHINRA IS MISSING THE ZIPPER DUE TO REASON I CAN'T CONTROL. PLEASE BE AWARE OF IT BEFORE PURCHASE\n\nPlease refer to the shapekey settings in the picture above to avoid mesh clipping.I will not take any responsibility for the clipping problems caused by not following the recommended shapekey setting.\n\nPlease refer to the last picture in the item page to be aware of the problems with this outfit.\n\nFor further information, please use google translate for the above Japanese text.\n----------------------------------------\n*신라는 사정으로인해 속옷부분에 지퍼가 없습니다. 제가 해결할수 있는 범위에 문제가 아니니 참고해주세요.\n\n최대한의 뚤림 방지를 위해, 사용시에는 상품소개사진의 쉐잎키 설정에 맞춰서 사용해주십시오.\n\n권장 쉐이프키를 이용하지 않을시 발생하는 문제는 대응하고 있지 않습니다.\n\n의상을 구매하기시 전에 마지막 상품사진에서 세부사항을 꼭 확인하시길 바랍니다。",
        url: "https://booth.pm/ja/items/5359699",
      },
      {
        image:
          "https://booth.pximg.net/10381146-5d7a-447b-b65f-c08de6424a27/i/5572679/78a05d46-aa8e-47c5-ae1a-c54db2a0ed65_base_resized.jpg",
        title: "♞C1 EXPANSION BIG SILHOUETTE MA1 & HOODIE SET♞",
        detail:
          '♞ MAISON DARC. C1 EXPANSION BIG SILHOUETTE MA1 & HOODIE SET ♞\n\n\n\n" BIG SILHOUETTE MA1 & HOODIE SET "\n\n\n\n―――――――――――――――――――――――――――――――――\n\n\n第一段コレクション『ストリートグランジコレクション』との互換性を持たせた拡張アイテムです。\n以下アイテムの再ダウンロードによるアップデートで着合わせも可能になります。\n自由な組み合わせであなただけのスタイルを見つけましょう。\n\n\n♞ DAMAGE DENIM CARGO ♞\u3000V1.2.0 ～\nhttps://maisondarc.booth.pm/items/5456061\n\n♞ NYLON ZIP PANTS ♞\u3000V1.2.0 ～\nhttps://maisondarc.booth.pm/items/5456045\n\n※水瀬のみMA1単体になります。ご注意下さい。同形シリーズ重ね着アイテムは以下になります。\n\n♞ GRUNGE HOODIE SET FOR MEN ♞\u3000V1.2.0 ～\nhttps://maisondarc.booth.pm/items/5456174\n\n\n―――――――――――――――――――――――――――――――――\n\n"Compatible extension items with the first-stage collection \'Street Grunge Collection\'.\nBy re-downloading the following items, mixing and matching becomes possible.\nFind your own style with free combinations.\n\n\n♞ DAMAGE DENIM CARGO ♞\nhttps://maisondarc.booth.pm/items/5456061\n\n♞ NYLON ZIP PANTS ♞\nhttps://maisondarc.booth.pm/items/5456045\n\nMinase is only available as an MA1 unit. Please be aware. The matching series layered items are as follows.\n\n♞ GRUNGE HOODIE SET FOR MEN ♞\nhttps://maisondarc.booth.pm/items/5456174"\n\n\n―――――――――――――――――――――――――――――――――\n\n\n♞対応アバター\n\nマヌカ - Manuka\n萌 - Moe\n森羅 - Shinra\n桔梗 - Kikyo\nセレスティア - Selestia\nラシューシャ - Lasyusha\nシフォン - Chiffon\nしお - Sio\n水瀬 - Minase\n\n\n\n♞ メッシュ内容\n\nMA1\nMA1 ShopTag\nDamage Short Pants\nHoodlie \nHoodie Lace Type1\nHoodie Lace Type2\n\n- Minase\nMA1\nMA1 ShopTag\n\n\n\n♞ 内容\n\n- Unity Package\n- Base Color TEX & Masktexture UV PSD\n\n\n\n\n\n♞ 対応シェーダー\n\nliltoon Shader\nhttps://booth.pm/ja/items/3087170\n\n\n\n\n♞ 注意事項\n\n前提としてVCCでセットアップしています。\nVCCへの移行をお願いいたします。\n\nデータのダウンロードの際にマテリアルやテクスチャを一括でパッケージングしたマテリアルパックも同時にダウンロードしてください。\n\n\n\n\n―――――――――――――――――――――――――――――――――\n\n\n\n♞ 利用規約\nVN3ライセンス（https://www.vn3.org/）を採用させていただいています。規約の全文は次のページでご覧いただけます。\n\n※配信での利用に関して\n\n企業様は別途DMにてご相談させてください。\n個人様であればDMに配信リンクを送っていただければ配信での使用は可能です。グッズ製作など商業目的の場合や配信などの収益に関わる場合も個人様であれば先ほどの条件で使用可能です。また改変時などによるデータの共用は禁止しております。Vtuber様の素体改変時に外部へ改変委託する際は２着購入していただく必要があります。一度購入して頂いた同一の個人様であれば他のチャンネルでの使用は許可します。\n\nhttps://drive.google.com/drive/folders/1xGU272rLuk_WkiJG6QnkL0pP02pF5j2M?usp=sharing\n\n※その他の問い合わせなどはDMにてお願いします。 For other inquiries, please use DM.',
        url: "https://booth.pm/ja/items/5572679",
      },
    ],
  });

  const boothItemsData = await prisma.booth_items.findMany();

  const postBoothItems = await prisma.post_booth_items.createMany({
    data: [
      {
        post_id: postsData[0].id,
        booth_id: boothItemsData[0].id,
      },
      {
        post_id: postsData[1].id,
        booth_id: boothItemsData[1].id,
      },
      {
        post_id: postsData[2].id,
        booth_id: boothItemsData[2].id,
      },
      {
        post_id: postsData[3].id,
        booth_id: boothItemsData[3].id,
      },
      {
        post_id: postsData[4].id,
        booth_id: boothItemsData[4].id,
      },
      {
        post_id: postsData[5].id,
        booth_id: boothItemsData[5].id,
      },
      {
        post_id: postsData[6].id,
        booth_id: boothItemsData[6].id,
      },
      {
        post_id: postsData[7].id,
        booth_id: boothItemsData[7].id,
      },
      {
        post_id: postsData[8].id,
        booth_id: boothItemsData[8].id,
      },
      {
        post_id: postsData[9].id,
        booth_id: boothItemsData[9].id,
      },
    ],
  });

  console.log(users);
  console.log(tags);
  console.log(posts);
  console.log(postImages);
  console.log(postTags);
  console.log(socialLinks);
  console.log(boothItems);
  console.log(postBoothItems);
  console.log("データ挿入が完了しました。");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
