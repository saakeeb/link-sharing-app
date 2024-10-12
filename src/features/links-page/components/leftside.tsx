import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ImageIcon, MoveRight } from 'lucide-react';
import React, { memo } from 'react';

import { WhiteBG } from '@/components/ui/white-bg/white-bg';
import { SocialLinksProps, useLinksShare } from '@/stores/links-store';

export const LinkView = memo(() => {
  const socialLinks = useLinksShare((state) => state.socialLinks);
  const updateSocialLinksOrder = useLinksShare(
    (state) => state.updateSocialLinksOrder,
  );
  const setSelectedSocialLink = useLinksShare(
    (state) => state.setSelectedSocialLink,
  );

  const handleDragEnd = (result: any) => {
    console.log('result: ', result);
    if (!result.destination) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const copylinks = Array.from(socialLinks);
    const [reorderlink] = copylinks.splice(startIndex, 1);
    copylinks.splice(endIndex, 0, reorderlink);

    updateSocialLinksOrder(copylinks);
  };

  const handleEditLinks = (link: SocialLinksProps) => {
    setSelectedSocialLink(link);
  };

  return (
    <WhiteBG>
      <div className="flex items-center justify-center">
        <div className="relative h-[70vh] w-72 rounded-3xl border-2 border-gray-800 bg-white p-1 shadow-lg">
          <div className="relative h-[68.6vh] w-[276px] rounded-3xl border-2 border-gray-800 bg-white shadow-lg">
            <div className="absolute -top-[5px] left-1/2 z-10 flex h-6 w-[140px] -translate-x-1/2 items-center justify-around rounded-2xl border-2 border-black border-t-white bg-white">
              <div className="size-2 rounded-full bg-black"></div>
              <div className="h-2 w-20 rounded-lg bg-slate-600"></div>
            </div>
            <div></div>
            <div className="mt-10 h-96 overflow-hidden">
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="links">
                  {(provided) => (
                    <ul
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex flex-col items-center justify-between gap-4 p-4"
                    >
                      {socialLinks.map(
                        (link: SocialLinksProps, index: number) => (
                          <Draggable
                            key={link.id}
                            draggableId={link.id || ''}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <li
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`flex w-full items-center justify-between rounded-lg bg-blue-600 py-3 text-left text-white shadow transition hover:bg-blue-500 ${
                                  snapshot.isDragging ? 'opacity-75' : ''
                                }`}
                              >
                                <div className="flex justify-start gap-2 pl-2">
                                  <ImageIcon name="link" />
                                  {link.platform}
                                </div>
                                <button
                                  className="pr-2"
                                  onClick={() => handleEditLinks(link)}
                                >
                                  <MoveRight />
                                </button>
                              </li>
                            )}
                          </Draggable>
                        ),
                      )}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </div>
        </div>
      </div>
    </WhiteBG>
  );
});
LinkView.displayName = 'LinkView';
