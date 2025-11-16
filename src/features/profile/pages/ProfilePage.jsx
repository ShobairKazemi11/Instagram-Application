// src/features/profile/pages/ProfilePage.jsx
import {
  Container,
  Stack,
  Tabs,
  Grid,
  Card,
  Text,
  Group,
  Avatar,
  Button,
  Paper,
  Title,
} from "@mantine/core";
import {
  IconPhoto,
  IconHeart,
  IconUser,
  IconCamera,
  IconEdit,
  IconMapPin,
  IconCalendar,
} from "@tabler/icons-react";
import { useAuthStore } from "../../auth/store/auth.store";
import { usePostsStore } from "../../posts/store/posts.store";
import PostCard from "../../posts/components/PostCard";

const ProfilePage = () => {
  const { user } = useAuthStore();
  const { posts } = usePostsStore();

  const userPosts = posts.filter((post) => post.userId === user.id);
  const totalLikes = userPosts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = userPosts.reduce(
    (sum, post) => sum + post.comments.length,
    0
  );

  const stats = [
    { label: "Posts", value: userPosts.length },
    { label: "Likes", value: totalLikes },
    { label: "Comments", value: totalComments },
  ];

  return (
    <Container size="sm" style={{ padding: 0 }}>
      <Stack gap="lg">
        {/* Profile Header */}
        <Card className="glass-card" style={{ padding: "2rem" }}>
          <Stack gap="lg">
            <Group justify="space-between" align="flex-start">
              <Group gap="xl" align="flex-start">
                <div style={{ position: "relative" }}>
                  <Avatar
                    src={user.avatar}
                    size={120}
                    radius="50%"
                    style={{ border: "3px solid rgba(255,255,255,0.3)" }}
                  />
                  <Button
                    className="glass-button"
                    size="xs"
                    style={{
                      position: "absolute",
                      bottom: 8,
                      right: 8,
                    }}
                  >
                    <IconCamera size={16} />
                  </Button>
                </div>

                <Stack gap="xs" style={{ flex: 1 }}>
                  <Group gap="md" align="center">
                    <Title className="text-2xl font-bold text-white">
                      {user.name}
                    </Title>
                    <Button
                      className="glass-button"
                      size="sm"
                      leftSection={<IconEdit size={16} />}
                    >
                      Edit Profile
                    </Button>
                  </Group>

                  <Group gap="lg">
                    <Group gap={4}>
                      <IconMapPin size={16} className="text-white-60" />
                      <Text className="text-white-60 text-sm">
                        New York, USA
                      </Text>
                    </Group>
                    <Group gap={4}>
                      <IconCalendar size={16} className="text-white-60" />
                      <Text className="text-white-60 text-sm">
                        Joined March 2024
                      </Text>
                    </Group>
                  </Group>

                  <Text
                    className="text-white-70"
                    style={{ maxWidth: 400, lineHeight: 1.6 }}
                  >
                    {user.bio}
                  </Text>
                </Stack>
              </Group>
            </Group>

            {/* Stats Section */}
            <Group gap="xl" justify="center">
              {stats.map((stat, index) => (
                <Paper
                  key={index}
                  className="glass-card stats-card"
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    minWidth: 100,
                  }}
                >
                  <Text className="text-xl font-bold text-white">
                    {stat.value}
                  </Text>
                  <Text className="text-white-60 text-sm">{stat.label}</Text>
                </Paper>
              ))}
            </Group>
          </Stack>
        </Card>

        <Tabs defaultValue="posts" variant="pills">
          <Tabs.List justify="center">
            <Tabs.Tab
              value="posts"
              leftSection={<IconPhoto size={16} />}
              className="text-white"
            >
              Posts
            </Tabs.Tab>
            <Tabs.Tab
              value="liked"
              leftSection={<IconHeart size={16} />}
              className="text-white"
            >
              Liked Posts
            </Tabs.Tab>
            <Tabs.Tab
              value="about"
              leftSection={<IconUser size={16} />}
              className="text-white"
            >
              About
            </Tabs.Tab>
          </Tabs.List>
          // Update the liked posts tab in ProfilePage.jsx
          <Tabs.Panel value="liked" style={{ paddingTop: "1.5rem" }}>
            <Stack gap="md">
              {posts.filter((post) => post.userReactions[user.id]).length >
              0 ? (
                posts
                  .filter((post) => post.userReactions[user.id])
                  .map((post) => <PostCard key={post.id} post={post} />)
              ) : (
                <Card
                  className="glass-card text-center"
                  style={{ padding: "3rem 2rem" }}
                >
                  <IconHeart size={48} className="text-white-60 mb-4" />
                  <Text className="text-lg font-semibold text-white mb-2">
                    No liked posts
                  </Text>
                  <Text className="text-white-60">
                    Posts you like will appear here
                  </Text>
                </Card>
              )}
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="about" style={{ paddingTop: "1.5rem" }}>
            <Card className="glass-card" style={{ padding: "2rem" }}>
              <Stack gap="md">
                <Text className="text-lg font-semibold text-white">
                  About Me
                </Text>
                <Text className="text-white-70">
                  Passionate developer and designer. Love creating beautiful
                  user experiences and solving complex problems. Always learning
                  and growing in the tech space.
                </Text>

                <Grid>
                  <Grid.Col span={6}>
                    <Text className="font-semibold text-white">Email</Text>
                    <Text className="text-white-60">{user.email}</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text className="font-semibold text-white">Location</Text>
                    <Text className="text-white-60">New York, USA</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text className="font-semibold text-white">Joined</Text>
                    <Text className="text-white-60">March 2024</Text>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Text className="font-semibold text-white">Website</Text>
                    <Text className="text-white-60">portfolio.example.com</Text>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Card>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
};

export default ProfilePage;
