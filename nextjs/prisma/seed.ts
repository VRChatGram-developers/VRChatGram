import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Usersデータの挿入
  const users = await prisma.users.createMany({
    data: [
      {
        name: '山田 太郎',
        email: 'taro.yamada@example.com',
        gender: 'male',
        birthday: new Date('1995-06-15'),
        my_id: 'TARO1995',
        uid: '1',
        show_sensitive_type: 'default',
        is_admin: false,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: '藤田 一郎',
        email: 'ichiro.fujita@example.com',
        gender: 'male',
        birthday: new Date('1990-03-12'),
        my_id: 'ICHIRO90',
        uid: '2',
        show_sensitive_type: 'default',
        is_admin: false,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: '斉藤 美優',
        email: 'miyu.saito@example.com',
        gender: 'female',
        birthday: new Date('1999-07-08'),
        my_id: 'MIYU99',
        uid: '3',
        show_sensitive_type: 'default',
        is_admin: false,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: '山口 健太',
        email: 'kenta.yamaguchi@example.com',
        gender: 'male',
        birthday: new Date('1991-12-01'),
        my_id: 'KENTA91',
        uid: '4',
        show_sensitive_type: 'default',
        is_admin: false,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: '石井 玲子',
        email: 'reiko.ishii@example.com',
        gender: 'female',
        birthday: new Date('1985-09-25'),
        my_id: 'REIKO85',
        uid: '5',
        show_sensitive_type: 'default',
        is_admin: false,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: '長谷川 翔太',
        email: 'shota.hasegawa@example.com',
        gender: 'male',
        birthday: new Date('1993-05-17'),
        my_id: 'SHOTA93',
        uid: '6',
        show_sensitive_type: 'default',
        is_admin: false,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: '森本 真由',
        email: 'mayu.morimoto@example.com',
        gender: 'female',
        birthday: new Date('1994-02-28'),
        my_id: 'MAYU94',
        uid: '7',
        show_sensitive_type: 'default',
        is_admin: false,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: '加藤 陽介',
        email: 'yosuke.kato@example.com',
        gender: 'male',
        birthday: new Date('1992-10-10'),
        my_id: 'YOSUKE92',
        uid: '8',
        show_sensitive_type: 'default',
        is_admin: false,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: '島田 結衣',
        email: 'yui.shimada@example.com',
        gender: 'female',
        birthday: new Date('2000-06-22'),
        my_id: 'YUI2000',
        uid: '9',
        show_sensitive_type: 'default',
        is_admin: false,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: '内田 智樹',
        email: 'tomoki.uchida@example.com',
        gender: 'male',
        birthday: new Date('1989-11-05'),
        my_id: 'TOMOKI89',
        uid: '10',
        show_sensitive_type: 'default',
        is_admin: false,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: '坂本 由美',
        email: 'yumi.sakamoto@example.com',
        gender: 'female',
        birthday: new Date('1995-04-30'),
        my_id: 'YUMI95',
        uid: '11',
        show_sensitive_type: 'default',
        is_admin: false,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ],
  });

  // Tagsデータの挿入
  const tags = await prisma.tags.createMany({
    data: [
      { name: '組み合わせコーデ', created_at: new Date(), updated_at: new Date() },
      { name: 'Marycia3D', created_at: new Date(), updated_at: new Date() },
      { name: '森羅', created_at: new Date(), updated_at: new Date() },
      { name: 'kaihenコーデコンテスト', created_at: new Date(), updated_at: new Date() },
      { name: 'Milltina', created_at: new Date(), updated_at: new Date() },
      { name: 'Lapwing', created_at: new Date(), updated_at: new Date() },
      { name: 'リアルクローズ', created_at: new Date(), updated_at: new Date() },
      { name: 'EXTENSIONCLOTHING', created_at: new Date(), updated_at: new Date() },
      { name: 'マヌカ', created_at: new Date(), updated_at: new Date() },
      { name: 'kaihen始めました', created_at: new Date(), updated_at: new Date() },
      { name: 'Grus', created_at: new Date(), updated_at: new Date() },
      { name: 'kaihenルックブック', created_at: new Date(), updated_at: new Date() },
      { name: '桔梗', created_at: new Date(), updated_at: new Date() },
      { name: 'PR', created_at: new Date(), updated_at: new Date() },
      { name: 'スカジャンkaihen', created_at: new Date(), updated_at: new Date() },
      { name: '龍のヨルちゃん', created_at: new Date(), updated_at: new Date() },
      { name: '秋コーデ', created_at: new Date(), updated_at: new Date() },
      { name: '萌', created_at: new Date(), updated_at: new Date() },
      { name: '冬コーデ', created_at: new Date(), updated_at: new Date() },
      { name: 'Natelier', created_at: new Date(), updated_at: new Date() }
    ],
  });

  const usersData = await prisma.users.findMany();

  // Postsデータの挿入
  const posts = await prisma.posts.createMany({
    data: [
      {
        user_id: usersData[0].id,
        title: '夕暮れの街角',
        view_count: 0,
        description: 'オレンジ色の空が広がる街角。ノスタルジックな気持ちになる一枚。',
        show_sensitive_type: 'all',
        is_publish: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: usersData[1].id,
        title: '森の静寂',
        view_count: 0,
        description: '朝露が輝く森の奥。鳥のさえずりが響く癒しの空間を切り取った。',
        show_sensitive_type: 'all',
        is_publish: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: usersData[2].id,
        title: '雨上がりの路地',
        view_count: 0,
        description: '濡れた石畳に映る街灯の光。幻想的な雰囲気の中で歩くひととき。',
        show_sensitive_type: 'all',
        is_publish: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: usersData[3].id,
        title: '星降る夜',
        view_count: 0,
        description: '澄んだ夜空に広がる無数の星。まるで宇宙に吸い込まれそうな風景。',
        show_sensitive_type: 'all',
        is_publish: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: usersData[4].id,
        title: '波打ち際の足跡',
        view_count: 0,
        description: '静かに打ち寄せる波と消えゆく足跡。思い出が詰まった夏の記憶。',
        show_sensitive_type: 'all',
        is_publish: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: usersData[5].id,
        title: 'ネオンの誘惑',
        view_count: 0,
        description: '都会の喧騒の中、輝くネオンが映し出す別世界のような夜の景色。',
        show_sensitive_type: 'all',
        is_publish: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: usersData[6].id,
        title: '紅葉のトンネル',
        view_count: 0,
        description: '真っ赤な紅葉が生み出す自然のトンネル。秋の訪れを感じる風景。',
        show_sensitive_type: 'all',
        is_publish: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: usersData[7].id,
        title: '古びたカフェ',
        view_count: 0,
        description: '木の温もりを感じるカフェ。レトロな雰囲気が心を落ち着かせる。',
        show_sensitive_type: 'all',
        is_publish: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: usersData[8].id,
        title: '線路沿いの桜',
        view_count: 0,
        description: '満開の桜並木と走り抜ける列車。春の訪れを象徴する美しい瞬間。',
        show_sensitive_type: 'all',
        is_publish: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: usersData[9].id,
        title: '光差す森',
        view_count: 0,
        description: '木々の隙間から差し込む朝日。生命の息吹を感じる幻想的な一枚。',
        show_sensitive_type: 'all',
        is_publish: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
  });

  const postsData = await prisma.posts.findMany();
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
  

  console.log(users);
  console.log(tags);
  console.log(posts);
  console.log(postTags);
  console.log('データ挿入が完了しました。');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
