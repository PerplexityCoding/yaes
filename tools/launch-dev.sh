#!/bin/sh

# Set Session Name
SESSION="Website"
SESSIONEXISTS=$(tmux list-sessions | grep $SESSION)

# Only create tmux session if it doesn't already exist
if [ "$SESSIONEXISTS" = "" ]
then
    tmux start-server

    # Start New Session with our name
    tmux new-session -d -s $SESSION

    # Name first Pane and start zsh
    tmux rename-window -t 0 'Main'
    tmux send-keys "npm run build:app:watch" C-m

    tmux splitw -h
    tmux send-keys "npm run build:content-script:watch" C-m

    tmux splitw -v
    tmux send-keys "npm run build:schemas" C-m

    tmux selectp -t 0
    tmux splitw -v
    tmux send-keys "npm run test:unit:watch" C-m
fi

# Attach Session, on the Main window
tmux attach-session -t $SESSION:0
