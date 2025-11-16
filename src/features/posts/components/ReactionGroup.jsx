// src/features/posts/components/ReactionGroup.jsx
import { useState } from 'react'
import { ActionIcon, Group, Popover } from '@mantine/core'
import { IconHeart, IconThumbUp, IconMoodSmile } from '@tabler/icons-react'
import { useAuthStore } from '../../auth/store/auth.store'
import { usePostsStore } from '../store/posts.store'

const ReactionGroup = ({ post }) => {
  const [opened, setOpened] = useState(false)
  const { user } = useAuthStore()
  const { addReaction } = usePostsStore()

  const reactions = [
    { type: 'like', icon: IconThumbUp, color: 'blue', label: 'Like' },
    { type: 'love', icon: IconHeart, color: 'red', label: 'Love' },
    { type: 'laugh', icon: IconMoodSmile, color: 'yellow', label: 'Laugh' },
  ]

  const currentReaction = post.userReactions[user.id]

  const handleReaction = (reactionType) => {
    addReaction(post.id, user.id, reactionType)
    setOpened(false)
  }

  const CurrentIcon = reactions.find(r => r.type === currentReaction)?.icon || IconThumbUp
  const currentColor = reactions.find(r => r.type === currentReaction)?.color || 'gray'

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position="top"
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <ActionIcon
          variant="subtle"
          color={currentColor}
          onMouseEnter={() => setOpened(true)}
          onMouseLeave={() => setOpened(false)}
          size="lg"
          className="text-white-70"
        >
          <CurrentIcon size={20} />
        </ActionIcon>
      </Popover.Target>

      <Popover.Dropdown onMouseEnter={() => setOpened(true)} onMouseLeave={() => setOpened(false)}>
        <Group gap="xs">
          {reactions.map((reaction) => {
            const IconComponent = reaction.icon
            return (
              <ActionIcon
                key={reaction.type}
                color={reaction.color}
                variant="subtle"
                onClick={() => handleReaction(reaction.type)}
                size="lg"
              >
                <IconComponent size={20} />
              </ActionIcon>
            )
          })}
        </Group>
      </Popover.Dropdown>
    </Popover>
  )
}

export default ReactionGroup